
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
import RoutesEha from "./pages-eha/routes";
const CyberDeck = lazy(() => import('./pages/cyber.deck/index.jsx'));
const Executive = lazy(() => import('./pages/executive/index.jsx'));
const AvailabilityPages = lazy(() => import('./pages/availability/index.jsx'));
const ThreatsMaps = lazy(() => import('./pages/threatsmaps/index.jsx'));
const queryClient = new QueryClient()


export default function App() {


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
              <Route path="/" element={<Navigate to={"/dashboard"}></Navigate>} />
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
            </Routes>
            <RoutesEha></RoutesEha>
          </HashRouter>
        </Suspense>
      </ContextGlobal.Provider>
    </QueryClientProvider>

  )
}
