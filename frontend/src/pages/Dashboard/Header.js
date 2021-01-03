import React from "react";
import Logo from "../../components/common/Logo";
import {
  Dropdown,
  DropdownItem,
  DropdownItemsContainer,
  Navbar,
  NavItem,
} from "../../components/common/Navbar";
import { SidebarHandle } from "../../components/common/Sidebar";

const Header = () => {
  return (
    <Navbar position="sticky">
      <Logo />
      <div className="flex items-center h-full text-sm">
        {/** A wrapper helper to hide this menu items for small screen and shown only in large screen */}
        <div className="hidden lg:block">
          <div className="flex items-center h-full">
            <NavItem to="/support" title="Support" />
            <Dropdown>
              <NavItem to="account" title="Account" dropdown />
              <DropdownItemsContainer>
                <DropdownItem to="/" title="Manage Account" />
                <DropdownItem to="/logout" title="Logout" />
              </DropdownItemsContainer>
            </Dropdown>
          </div>
        </div>
        {/** shown hamburger menu in small screen and hide it in on large screen */}
        <div className="lg:hidden mr-4">
          <SidebarHandle />
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
