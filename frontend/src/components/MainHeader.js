import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  DrawerNavigation,
  DrawerNavigationHandler,
  DrawerNavigationItem,
  DrawerNavigationLayout,
} from "./common/DrawerNavigation";
import Logo from "./common/Logo";
import { Navbar, NavItem } from "./common/Navbar";

const MainHeader = () => {
  const [visibility, setVisibility] = useState(true);
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register")
      setVisibility(false);
    else setVisibility(true);
  }, [location]);

  return (
    <DrawerNavigationLayout>
      <div
        className={`w-full relative ${
          visibility && !auth.user ? "block" : "hidden"
        }`}
      >
        <DrawerNavigation>
          <div className="logo-box flex justify-center w-full mt-2">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <DrawerNavigationItem to="/">Home</DrawerNavigationItem>
            <DrawerNavigationItem to="/about">About</DrawerNavigationItem>
            <DrawerNavigationItem to="/support">Support</DrawerNavigationItem>
            <DrawerNavigationItem to="/register">Sign Up</DrawerNavigationItem>
            <DrawerNavigationItem to="/login">Sign In</DrawerNavigationItem>
          </div>
        </DrawerNavigation>
        <Navbar
          position="sticky"
          className="pl-3 pr-3 sm:pl-8 sm:pr-8 lg:pl-20 lg:pr-20"
        >
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center h-full text-sm">
            <div className="hidden h-full lg:flex">
              <NavItem to="/" title="Home" />
              <NavItem to="/about" title="About" />
              <NavItem to="/support" title="Support" />
              <NavItem to="/register" title="Sign Up" />
              <NavItem to="/login" title="Sign In" />
            </div>
            <div className="block lg:hidden">
              <DrawerNavigationHandler />
            </div>
          </div>
        </Navbar>
      </div>
    </DrawerNavigationLayout>
  );
};

export default MainHeader;
