import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function Layout() {
  return (
    <>
      <Navbar />      {/* Navbar har page pe permanent */}
      <Outlet />      {/* Yahan page content render hoga */}
    </>
  );
}