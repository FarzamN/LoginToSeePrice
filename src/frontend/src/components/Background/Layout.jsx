import { useLayoutEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Layout = () => {
  return (
    <div className="relative flex w-screen h-full font-poppins">
      <Outlet />
    </div>
  );
};

export default Layout;
