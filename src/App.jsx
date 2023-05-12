
import { HashRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ContextGlobal } from "./helper/context";
import { ValueContext } from "./model/context";
import { Suspense, lazy } from "react";
import Logo from "./assets/logo.svg"
import { QueryClient, QueryClientProvider } from 'react-query'
import { LayoutDashboard } from "./components/layout/dashboard.layout";
import { LoadingOther } from "./components/loading/loadingOther";
import { HeadersTop } from './components/headers';
import ProfileIndicator from "./pages-eha/profile.indicator";
import AssetsList from "./pages-eha/list.asset";
import ListTask from "./pages-eha/list.task.scan";
import ListMaintenance from "./pages-eha/list.maintenance";
import TargetReady from "./pages-eha/list.task.target";
import TaskQA from "./pages-eha/list.task.qa";
import ListTaskVulnerability from "./pages-eha/list.vulnerability";
import { API_GET } from "./api/elwagyl";
import styled from "styled-components";
import LoginPages from "./pages/login";
import { CookiesProvider } from 'react-cookie';
import PrivateRoute from "./privateRoutes";
import Settings from "./pages-ums/settings";
import NotFoundUMS from "./pages-ums/notfound";
import { MassagesDrawer } from "./components/headers/messages.drawer";
import { Result } from "antd";
import UserManagement from "./pages-ums/usermanagement";
import WelcomeEha from "./pages-eha/welcome";
import { LicensePoup } from "./components/licensePopup";
import ProfilePage from "./pages/profile";
const CyberDeck = lazy(() => import('./pages/cyber.deck/index.jsx'));
const Executive = lazy(() => import('./pages/executive/index.jsx'));
const AvailabilityPages = lazy(() => import('./pages/availability/index.jsx'));
const ThreatsMaps = lazy(() => import('./pages/threatsmaps/index.jsx'));
const MainDeck = lazy(() => import('./pages-eha/main.deck/index.jsx'));
const queryClient = new QueryClient()



export default function App() {
  return (<div className="flex flex-col flex-1" >
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ContextGlobal.Provider value={ValueContext()}>
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
                <Route path="/" element={<LoginPages></LoginPages>} />
                <Route path="/message" element={<MassagesDrawer />} />
                <Route path="/license" element={<LicensePoup />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/dashboard" element={<Container></Container>}>
                  <Route index element={<CyberDeck />} />
                  <Route path="executive" element={<Executive />} />
                  <Route path="availability" element={<AvailabilityPages />} />
                  <Route path="threats-maps" element={<ThreatsMaps />} />
                  <Route path="*" element={<LayoutDashboard>
                    <LoadingOther></LoadingOther>
                  </LayoutDashboard>} />
                </Route>
                <Route path="ums" element={<ContainerNoHead ums />}>
                  <Route index element={<Navigate state={{ title: ` USER MANAGEMENT SYSTEM // DASHBOARD`, ums: true }} to={`/ums/dashboard`} />} />
                  <Route path="user management" element={<UserManagement></UserManagement>} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<NotFoundUMS />} />
                </Route>
                <Route path={"eha"} element={<ContainerNoHead />}>
                  <Route index element={<Navigate state={{ title: `10 // eha // MAIN DECK`, eha: true }} to={`/eha/home`} />} />
                  <Route path="welcome" element={<WelcomeEha />} />
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
                  <Route path="*" element={<LayoutDashboard>
                    <LoadingOther></LoadingOther>
                  </LayoutDashboard>} />
                </Route>
              </Routes>
            </HashRouter>
          </Suspense>
        </ContextGlobal.Provider>
      </QueryClientProvider>
    </CookiesProvider>
  </div>

  )
}

let Main = styled.div`
  .static > div, .timer {
    background: ${props => props.color};
  }

  .status-ip {
    border-color: ${props => props.color}
  }
  .banner svg, .banner, .banner > div {
    width: 100%;
    height: 100%;
  }

  .banner svg > g > rect {
    fill: ${props => props.color}
  }
  .main-logo path {
    fill: ${props => props.color}
  }

`

export const Container = () => {


  let ping = API_GET.API_PING()



  let API_SEVERITY = API_GET.ALERT_SEVERITY()

  let ColorChange = API_SEVERITY.isLoading ? "" : API_SEVERITY.system.color



  return (ping.isLoading ? "" : ping.data.alive ? <PrivateRoute>
    <Main className="flex flex-col flex-1" color={ColorChange} style={{
      color: ColorChange
    }}>
      <HeadersTop />
      <Outlet></Outlet>
    </Main>
  </PrivateRoute> : <div className="flex items-center justify-center flex-1">
    <Result
      status="warning"
      title={<span className="uppercase">You are offline, please check your internet network and VPN network</span>}
      extra={
        <button className="border border-primary px-4 py-2 hover:bg-blue hover:text-[#000]" onClick={() => {
          window.api.invoke('network', ["network"])
        }}>
          CHECK YOUR NETWORK
        </button>
      }
    />
  </div>)
}

const ContainerNoHead = ({ eha = false, ums = false }) => {

  let ping = API_GET.API_PING()



  return ping.isLoading ? "" : ping.data.alive ? <PrivateRoute>

    <HeadersTop background={"#101C26"} nohead={{
      eha,
      ums
    }} />

    <Outlet></Outlet>
  </PrivateRoute> : <div className="flex items-center justify-center flex-1">
    <Result
      status="warning"
      title={<span className="uppercase">You are offline, please check your internet network and VPN network</span>}
      extra={
        <button className="border border-primary px-4 py-2 hover:bg-blue hover:text-[#000]" onClick={() => {
          window.api.invoke('network', ["network"])
        }}>
          CHECK YOUR NETWORK
        </button>
      }
    />
  </div>
}