import React, { createContext, useContext, useReducer } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft, MenuAltThree } from "../icons";
import ListItem from "./ListItem";

const css = String.raw;

// Default sidebar reducer actions
export const actions = {
  HIDE: "HIDE",
  SHOW: "SHOW",
  UPDATE_HEADER_TITLE: "UPDATE_HEADER_TITLE",
};

/**
 * Initialize the sidebar context
 */
export const SidebarContext = createContext();
/**
 * Initialize sidebar initial state.
 * By default the sidebar should be hidden for small screen ( < 1024px) and only visible
 * in large screen ( >= 1023px)
 */
export const initialState = {
  visibility: (() => (window.innerWidth >= 1024 ? true : false))(),
  action: null,
  headerTitle: "Home",
};

/**
 * Initialize sidebar reducer to allow to change sidebar visibility
 * in other component
 */
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
    case actions.UPDATE_HEADER_TITLE:
      return {
        ...state,
        headerTitle: action.payload,
      };
    default:
      throw new Error("Unknown sidebar action");
  }
};
/**
 * SidebarLayout, wrap all components in the sidebarContext a
 * @param {object} props // all props for the main div element
 */
export const SidebarLayout = ({ className, children, ...resOfProps }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SidebarContext.Provider value={[state, dispatch]}>
      <div className={`h-screen ${className ? className : ""}`} {...resOfProps}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

/**
 * The sub layout that will contain the sidebar and the side content
 * @param {object} props // all div props plus options to define the size of the sidebar
 */
export const SidebarLayoutMain = styled.div`
  ${({ options = { sidebarWidth: "6rem" } }) => css`
    display: grid;
    grid-template-columns: ${options.sidebarWidth} auto;
  `}
`;

/**
 * Sidebar wrapper that will contain sidebar element.
 * The visibility of the sidebar is defined by the visibility property
 * in the sidebar context state.
 * @param {object} props div props for the sidebar
 */
export const Sidebar = ({ className, children, ...resOfProps }) => {
  // get state from context
  const [{ visibility }] = useContext(SidebarContext);

  return (
    <div
      className={`sidebar pl-2 pr-2 flex flex-col transition duration-500 ease-in-out ${
        visibility ? "block" : "hidden"
      } lg:block z-50 absolute w-full sm:w-60 lg:w-auto lg:relative  h-full min-h-screen ${
        className ? className : ""
      }`}
      {...resOfProps}
    >
      <div className="sm:hidden absolute top-3 right-4">
        <CloseSidebar />
      </div>
      {children}
    </div>
  );
};

export const CloseSidebar = () => {
  const dispatch = useContext(SidebarContext)[1];

  return (
    <ArrowLeft
      className="icon cursor-pointer"
      onClick={() => dispatch({ type: actions.HIDE })}
    />
  );
};

export const OpenSidebar = () => {
  const dispatch = useContext(SidebarContext)[1];

  return (
    <MenuAltThree
      className="icon cursor-pointer"
      onClick={() => dispatch({ type: actions.SHOW })}
    />
  );
};

export const SidebarHandle = () => {
  const [{ visibility }] = useContext(SidebarContext);
  return (
    <>
      {!visibility && <OpenSidebar />}
      {visibility && <CloseSidebar />}
    </>
  );
};

export const SidebarItem = ({
  to,
  className = "",
  children,
  onClick = () => {},
}) => {
  const dispatch = useContext(SidebarContext)[1];
  const handleClick = (e) => {
    onClick(e);
    // close sidebar when clicked on sidebar item if is small screen
    if (window.innerWidth < 1024) dispatch({ type: actions.HIDE });
    return true;
  };
  return (
    <NavLink onClick={handleClick} exact to={to}>
      <ListItem className={`${className}`}>{children}</ListItem>
    </NavLink>
  );
};
