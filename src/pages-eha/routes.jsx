import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { HeadersTop } from "../components/headers"
import MainDeck from "./main.deck";
const RoutesEha = () => {
  return (
    <Routes>
      <Route path="eha" element={<>
        <HeadersTop eha={true} />
        <Outlet></Outlet>
      </>}>
        <Route index element={<Navigate to={"/eha/dashboard"}/>} />
        <Route path="dashboard" element={<MainDeck />} />
        <Route path="profile-indicator" element={<MainDeck />} />
        <Route path="assets" element={<MainDeck />} />
        <Route path="task" element={<MainDeck />} />
        <Route path="vulnerability" element={<MainDeck />} />
        <Route path="maintenance" element={<MainDeck />} />
      </Route>
    </Routes>
  )

}

export default RoutesEha