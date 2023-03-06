import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { HeadersTop } from "../components/headers"
import AssetsList from "./list.asset";
import ListMaintenance from "./list.maintenance";
import ListTask from "./list.task";
import MainDeck from "./main.deck";
import ProfileIndicator from "./profile.indicator";

const RoutesEha = () => {
  return (
    <Routes>
      <Route path="eha" element={<>
        <HeadersTop background={"#101C26"} eha={true} />
        <Outlet></Outlet>
      </>}>
        <Route index element={<Navigate to={"/eha/dashboard"} />} />
        <Route path="dashboard" element={<MainDeck />} />
        <Route path="profile-indicator" element={<ProfileIndicator />} />
        <Route path="assets" element={<AssetsList />} />
        <Route path="task" element={<ListTask />} />
        <Route path="vulnerability" element={<MainDeck />} />
        <Route path="maintenance" element={<ListMaintenance />} />
      </Route>
    </Routes>
  )

}

export default RoutesEha