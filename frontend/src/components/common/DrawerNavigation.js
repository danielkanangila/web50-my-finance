import React, { createContext, useContext, useReducer } from "react";
import { ArrowLeft, MenuAltThree } from "../icons";
import { NavItem } from "./Navbar";

export const actions = {
  HIDE: "HIDE",
  SHOW: "SHOW",
};

export const DrawerNavigationContext = createContext();

export const initialState = {
  visibility: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.HIDE:
      return {
        ...state,
        visibility: false,
      };
    case actions.SHOW:
      return {
        ...state,
        visibility: true,
        action: "open",
      };
    default:
      throw new Error("Unknown drawer navigation action");
  }
};

export const DrawerNavigationLayout = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DrawerNavigationContext.Provider value={[state, dispatch]}>
      {children}
    </DrawerNavigationContext.Provider>
  );
};

export const DrawerNavigation = ({ className, children, ...restOfProps }) => {
  const [{ visibility }] = useContext(DrawerNavigationContext);

  return (
    <div
      className={`z-50 absolute bg-white h-screen w-screen ${
        visibility ? "block drawer-menu-open" : "hidden"
      }`}
      {...restOfProps}
    >
      <div className="absolute top-3 right-4">
        <CloseDrawerNav />
      </div>
      {children}
    </div>
  );
};

export const CloseDrawerNav = () => {
  const dispatch = useContext(DrawerNavigationContext)[1];

  return (
    <ArrowLeft
      className="icon cursor-pointer"
      onClick={() => dispatch({ type: actions.HIDE })}
    />
  );
};

export const OpenDrawerNav = () => {
  const dispatch = useContext(DrawerNavigationContext)[1];

  return (
    <MenuAltThree
      className="icon cursor-pointer"
      onClick={() => dispatch({ type: actions.SHOW })}
    />
  );
};

export const DrawerNavigationHandler = () => {
  const [{ visibility }] = useContext(DrawerNavigationContext);
  return (
    <>
      {!visibility && <OpenDrawerNav />}
      {visibility && <CloseDrawerNav />}
    </>
  );
};

export const DrawerNavigationItem = ({
  to,
  className = "",
  children,
  onClick = () => {},
}) => {
  const dispatch = useContext(DrawerNavigationContext)[1];

  const handleClick = (e) => {
    onClick(e);
    // close drawer navigation
    dispatch({ type: actions.HIDE });
    return true;
  };

  return (
    <NavItem
      to={to}
      className={`w-full flex justify-center ${className}`}
      onClick={handleClick}
    >
      {children}
    </NavItem>
  );
};
