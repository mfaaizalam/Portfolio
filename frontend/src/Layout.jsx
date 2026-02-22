import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <>
      <Navbar />      {/* Navbar har page pe permanent */}
      <Outlet />      {/* Yahan page content render hoga */}
      <Footer />      {/* Footer bhi har page pe permanent */}
    </>
  );
}