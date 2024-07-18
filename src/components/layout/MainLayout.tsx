import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer1 from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer1></Footer1>
    </>
  );
};

export default MainLayout;
