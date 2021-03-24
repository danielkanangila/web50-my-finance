import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./../../styles/navbar.scss";
export const Navbar = ({
  position = "sticky top-0",
  bg = "bg-white",
  shadow = "shadow-md",
  children,
  className = "",
}) => {
  return (
    <nav
      className={`${position} z-40 h-12 w-full lg:w-auto ${bg} ${shadow} shadow-sm flex items-center justify-between ${className}`}
    >
      {children}
    </nav>
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
    className={`nav-item transition duration-500 ease-in-out flex justify-center items-center h-full w-full lg:w-auto p-3 px-4 hover:bg-gray-900 hover:text-white ${
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
    className={`relative inline-block text-left w-full lg:w-auto ${
      className ? className : ""
    }`}
  >
    {children}
  </div>
);

export const DropdownItemsContainer = ({
  className,
  children,
  visibility,
  ...restOfProps
}) => (
  <div
    {...restOfProps}
    className={`${
      visibility ? "block" : "hidden"
    } origin-top-right absolute right-0 mt-2 w-full lg:w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ${
      className ? className : ""
    }`}
    role="menu"
  >
    {children}
  </div>
);

export const DropdownItemGroup = ({ className, children, ...restOfProps }) => {
  return (
    <div {...restOfProps} className={`py-1 ${className}`} role="none">
      {children}
    </div>
  );
};

export const DropdownItem = ({
  to,
  title,
  className,
  children,
  ...restOfProps
}) => (
  <Link
    to={to}
    className={`dropdown-item transition duration-500 text-gray-700 ease-in-out block text-left py-3 px-3 hover:bg-gray-100 hover:text-gray-900 ${
      className ? className : ""
    }`}
    {...restOfProps}
    role="menuitem"
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
