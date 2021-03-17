import React from "react";
import { Navbar } from "../../components/common/Navbar";
import { SidebarHandle } from "../../components/common/Sidebar";
import LinkBankButton from "../../components/LinkBankButton";
import HeaderTitle from "./HeaderTitle";

const Header = () => {
  return (
    <Navbar position="sticky top-0" className="px-4 sm:px-8 lg:px-10">
      <HeaderTitle />
      <div className="flex items-center h-full text-sm">
        {/** A wrapper helper to hide this menu items for small screen and shown only in large screen */}
        <div className="hidden lg:block">
          <div className="flex items-center h-full">
            <LinkBankButton />
          </div>
        </div>
        {/** shown hamburger menu in small screen and hide it in on large screen */}
        <div className="lg:hidden">
          <SidebarHandle />
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
