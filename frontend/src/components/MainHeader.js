import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  DrawerNavigation,
  DrawerNavigationHandler,
  DrawerNavigationLayout,
} from "./common/DrawerNavigation";
import Logo from "./common/Logo";
import {
  Dropdown,
  DropdownItemGroup,
  DropdownItemsContainer,
  DropdownItem,
  Navbar,
  NavItem,
} from "./common/Navbar";
import Button from "./common/Button";
import LinkBankButton from "./LinkBankButton";
import UserInfo from "./UserInfo";

const MainHeader = () => {
  const auth = useAuth();

  return (
    <DrawerNavigationLayout>
      <div className="w-full sticky top-0 block">
        <DrawerNavigation>
          <div className="logo-box flex justify-center w-full mt-2">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <AuthUserMenu auth={auth} visibility={!!auth.user} />
            <AnonymousUserMenu visibility={!auth.user} />
          </div>
        </DrawerNavigation>
        <Navbar
          position="relative"
          className="pl-3 pr-3 sm:pl-8 sm:pr-8 lg:pl-20 lg:pr-20"
        >
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center h-full text-sm">
            <div className="flex items-center hidden lg:flex">
              <AuthUserMenu auth={auth} visibility={!!auth.user} />
              <AnonymousUserMenu visibility={!auth.user} />
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

const AuthUserMenu = ({ auth, visibility }) => {
  if (visibility)
    return (
      <div className="flex flex-col h-full lg:flex-row w-full justify-center items-center lg:items-start lg:w-auto">
        <NavItem to={`/users/${auth?.user?.id}`} title="Overview" />
        {/* <NavItem
          to={`/users/${auth?.user?.id}/transactions`}
          title="Transactions History"
        /> */}
        <UserDropdownMenu user={auth?.user} />
      </div>
    );
  else return <></>;
};

const UserDropdownMenu = ({ user }) => {
  const [itemsVisibility, setItemsVisibility] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setItemsVisibility(!itemsVisibility);
  };
  return (
    <Dropdown>
      <NavItem to={`/#my-account`} dropdown={true} onClick={handleClick}>
        My Account
      </NavItem>
      <DropdownItemsContainer visibility={itemsVisibility}>
        {/* <div className="px-4 my-5 mt-8">
          <UserInfo />
          <LinkBankButton />
        </div> */}
        <DropdownItemGroup>
          <DropdownItem to={`/${user.id}/account`} title="Manage Account" />
        </DropdownItemGroup>
        <DropdownItemGroup>
          <DropdownItem to="/logout" title="Logout" />
        </DropdownItemGroup>
      </DropdownItemsContainer>
    </Dropdown>
  );
};

const AnonymousUserMenu = ({ visibility }) => {
  if (visibility)
    return (
      <div className="flex flex-col h-full lg:flex-row">
        <NavItem to="/" title="Home" />
        <NavItem to="/about#howItWorks" title="How It Works?" />
        <NavItem to="/pricing" title="Pricing" />
        <SignInButton visibility={true} />
      </div>
    );
  else return <></>;
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

export default function MainHeaderRender() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register")
    return <></>;
  else return <MainHeader />;
}
