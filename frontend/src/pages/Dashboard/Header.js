import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="fixed z-50 h-12 w-full bg-white shadow-sm flex items-center justify-between">
      <Logo />
      <div className="flex items-center h-full text-sm">
        <div className="flex items-center h-full">
          <NavItem path="/support" title="Support" />
          <div className="group relative h-full">
            <NavItem path="/accounts">
              Account
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="h-6 w-6 text-grey-darker parent-hover:text-white fill-current ml-1"
              >
                <path
                  className="heroicon-ui"
                  d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
                />
              </svg>
            </NavItem>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ path, title, className, children, ...restOfProps }) => (
  <NavLink
    to={path}
    className={`transition duration-500 ease-in-out flex items-center h-full px-4 hover:bg-green-500 hover:text-white ${
      className ? className : ""
    }`}
    {...restOfProps}
  >
    {children ? children : title}
  </NavLink>
);

const Logo = () => (
  <div className="flex items-center h-full">
    <div className="flex items-center text-center h-full w-40">
      <span className="w-full text-sm text-green-500 uppercase font-extrabold">
        Tylpe.com
      </span>
    </div>
  </div>
);

export default Header;
