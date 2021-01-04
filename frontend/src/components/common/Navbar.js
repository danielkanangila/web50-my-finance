import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./../../styles/navbar.scss";
export const Navbar = ({
  position = "relative",
  bg = "bg-white",
  shadow = "shadow-sm",
  children,
  className = "",
}) => {
  return (
    <div
      className={`${position} z-40 h-12 w-full lg:w-auto ${bg} ${shadow} shadow-sm flex items-center justify-between ${className}`}
    >
      {children}
    </div>
  );
};

export const NavItem = ({
  to,
  title,
  className,
  children,
  dropdown,
  ...restOfProps
}) => (
  <NavLink
    to={to}
    className={`nav-item transition duration-500 ease-in-out flex items-center h-full p-3 px-4 hover:bg-gray-900 hover:text-white ${
      className ? className : ""
    }`}
    {...restOfProps}
  >
    {children ? children : title}
    {dropdown ? <DropdownIndicator /> : null}
  </NavLink>
);

export const Dropdown = ({ className, children, ...restOfProps }) => (
  <div
    {...restOfProps}
    className={`group relative h-full ${className ? className : ""}`}
  >
    {children}
  </div>
);

export const DropdownItemsContainer = ({
  className,
  children,
  ...restOfProps
}) => (
  <div
    {...restOfProps}
    className={`dropdown-items hidden group-hover:block absolute pin-r top-full w-48 bg-white shadow rounded-b ${
      className ? className : ""
    }`}
  >
    {children}
  </div>
);

export const DropdownItem = ({
  to,
  title,
  className,
  children,
  ...restOfProps
}) => (
  <Link
    to={to}
    className={`dropdown-item transition duration-500 ease-in-out block text-left py-3 px-3 hover:bg-green-500 hover:text-white text-xs ${
      className ? className : ""
    }`}
    {...restOfProps}
  >
    {children ? children : title}
  </Link>
);

export const DropdownIndicator = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className="h-6 w-6 text-grey-darker nav-item--hover:text-white fill-current ml-1"
  >
    <path
      className="heroicon-ui"
      d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
    />
  </svg>
);
