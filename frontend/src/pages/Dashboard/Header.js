import React from "react";
import Logo from "../../components/Logo";
import {
  Dropdown,
  DropdownItem,
  DropdownItemsContainer,
  Navbar,
  NavItem,
} from "../../components/Navbar";

const Header = () => {
  return (
    <Navbar position="fixed">
      <Logo />
      <div className="flex items-center h-full text-sm">
        <div className="flex items-center h-full">
          <NavItem to="/support" title="Support" />
          <Dropdown>
            <NavItem to="account" title="Account" dropdown />
            <DropdownItemsContainer>
              <DropdownItem to="/" title="My Account" />
              <DropdownItem to="/" title="Edit Account" />
              <DropdownItem to="/logout" title="Logout" />
            </DropdownItemsContainer>
          </Dropdown>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;
