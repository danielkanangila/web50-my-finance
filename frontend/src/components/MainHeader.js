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
import Button from "./common/Button";

const MainHeader = () => {
  const [visibility, setVisibility] = useState(true);
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      (auth?.user && location.pathname !== "/")
    )
      setVisibility(false);
    else setVisibility(true);
  }, [location, auth.user]);

  return (
    <DrawerNavigationLayout>
      <div className={`w-full ${visibility ? "relative" : "hidden"}`}>
        <DrawerNavigation>
          <div className="logo-box flex justify-center w-full mt-2">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="mt-8 flex flex-col items-center">
            {auth.user && (
              <DrawerNavigationItem to={`/${auth.user.id}`}>
                Go to Dashboard
              </DrawerNavigationItem>
            )}
            <DrawerNavigationItem to="/">Home</DrawerNavigationItem>
            <DrawerNavigationItem to="/about">About</DrawerNavigationItem>
            <DrawerNavigationItem to="/support">Support</DrawerNavigationItem>
            <SignInButton visibility={!auth.user} width="w-11/12" />
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
              {auth.user && (
                <NavItem to={`/${auth.user.id}`}>Go to Dashboard</NavItem>
              )}
              <SignInButton visibility={!auth.user} />
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

const SignInButton = ({ visibility, width = "w-max" }) => {
  if (visibility)
    return (
      <div className={`flex items-center justify-center ${width}`}>
        <Link to="/login">
          <Button className="small">Sign In</Button>
        </Link>
      </div>
    );
  else return <></>;
};

export default MainHeader;
