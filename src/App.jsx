
import { HashRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ContextGlobal } from "./helper/context";
import { ValueContext } from "./model/context";
import { Suspense, lazy, useEffect, useState } from "react";
import Logo from "./assets/logo.svg"
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";
import { STEPBYSTEP } from "./model/information";
import { QueryClient, QueryClientProvider } from 'react-query'
import { LayoutDashboard } from "./components/layout/dashboard.layout";
import { LoadingOther } from "./components/loading/loadingOther";
import { HeadersTop } from './components/headers';
import MainDeck from "./pages-eha/main.deck";
import ProfileIndicator from "./pages-eha/profile.indicator";
import AssetsList from "./pages-eha/list.asset";
import ListTask from "./pages-eha/list.task.scan";
import ListMaintenance from "./pages-eha/list.maintenance";
import TargetReady from "./pages-eha/list.task.target";
import TaskQA from "./pages-eha/list.task.qa";
import ListTaskVulnerability from "./pages-eha/list.vulnerability";
const CyberDeck = lazy(() => import('./pages/cyber.deck/index.jsx'));
const Executive = lazy(() => import('./pages/executive/index.jsx'));
const AvailabilityPages = lazy(() => import('./pages/availability/index.jsx'));
const ThreatsMaps = lazy(() => import('./pages/threatsmaps/index.jsx'));
const queryClient = new QueryClient()


export default function App() {

  let route = "eha"

  const [ishow, setishow] = useState(localStorage.getItem('step'));
  const [status, setstatus] = useState();

  useEffect(() => {

    setTimeout(() => {
      setstatus(true)
    }, 3000);
    return () => {
      setstatus()
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ContextGlobal.Provider value={ValueContext()}>
        {status && !ishow &&
          <Steps
            enabled={!ishow}
            steps={STEPBYSTEP}
            initialStep={0}
            onExit={() => {
              localStorage.setItem("step", true)
              setishow(true)
            }}
            // onBeforeExit={() => confirm("Are you sure to exit the tutorial ?")}
            options={{
              showProgress: false,
              showBullets: true,
              exitOnEsc: false,
              exitOnOverlayClick: false,
            }}

          />
        }


        <Suspense fallback={
          <div className="w-full h-full fixed top-0 justify-center flex items-center text-[red] text-5xl">
            <div className="progress-circle-pulse">
              <div className="big-circle"></div>
              <div className="small-circle"></div>
              <img className="absolute" width={100} height={100} src={Logo}></img>
            </div>
          </div>}>
          <HashRouter>
            <Routes>
              <Route path="*" element={<HeadersTop />} />
              <Route path="/" element={<Navigate to={"/dashboard"} state={{ title: "CYBER DECK" }}></Navigate>} />
              <Route path="/dashboard" element={<>
                <HeadersTop />
                <Outlet></Outlet>
              </>}>
                <Route index element={<CyberDeck />} />
                <Route path="executive" element={<Executive />} />
                <Route path="availability" element={<AvailabilityPages />} />
                <Route path="threats-maps" element={<ThreatsMaps />} />
                <Route path="*" element={<LayoutDashboard>
                  <LoadingOther></LoadingOther>
                </LayoutDashboard>} />
              </Route>
              <Route path={route} element={<>
                <HeadersTop background={"#101C26"} eha={true} />
                <Outlet></Outlet>
              </>}>

                <Route index element={<Navigate state={{ title: `10 // ${route} // MAIN DECK` }} to={`/${route}/home`} />} />
                <Route path="home" element={<MainDeck />} />
                <Route path="profile-indicator" element={<ProfileIndicator />} />
                <Route path="assets" element={<AssetsList />} />
                <Route path="task">
                  <Route index element={<Navigate to={"/task/scan"} state={{ title: "SCAN" }}></Navigate>} />
                  <Route path="scan" element={<ListTask />} />
                  <Route path="qc" element={<TaskQA></TaskQA>} />
                  <Route path="target" element={<TargetReady />} />
                </Route>
                <Route path="vulnerability" element={<ListTaskVulnerability />} />
                <Route path="maintenance" element={<ListMaintenance />} />
              </Route>
            </Routes>
          </HashRouter>
        </Suspense>
      </ContextGlobal.Provider>
    </QueryClientProvider>

  )
}
