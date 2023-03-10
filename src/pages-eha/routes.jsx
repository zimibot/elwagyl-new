import {  Route, Outlet, Navigate } from "react-router-dom";
import { HeadersTop } from "../components/headers"
import AssetsList from "./list.asset";
import ListMaintenance from "./list.maintenance";
import ListTask from "./list.task.scan";
import MainDeck from "./main.deck";
import ProfileIndicator from "./profile.indicator";

const RoutesEha = () => {
  let route = "eha"
  return (
    <Route path={route} element={<>
      <HeadersTop background={"#101C26"} eha={true} />
      <Outlet></Outlet>
    </>}>

      <Route index element={<Navigate to={`/${route}/home`} />} />
      <Route path="home" element={<MainDeck />} />
      <Route path="profile-indicator" element={<ProfileIndicator />} />
      <Route path="assets" element={<AssetsList />} />
      <Route path="task" element={<ListTask />} />
      <Route path="vulnerability" element={<MainDeck />} />
      <Route path="maintenance" element={<ListMaintenance />} />
    </Route>
  )

}

export default RoutesEha