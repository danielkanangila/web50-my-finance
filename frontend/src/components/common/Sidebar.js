import React, { createContext, useContext, useReducer } from "react";
import styled from "styled-components";

const css = String.raw;

// Default sidebar reducer actions
export const actions = {
  HIDE: "HIDE",
  SHOW: "SHOW",
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
      };
    default:
      throw new Error("Unknown action");
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
  const [state] = useContext(SidebarContext);

  return (
    <>
      {state.visibility && (
        <div
          className={`sidebar hidden lg:block relative h-full min-h-screen ${
            className ? className : ""
          }`}
          {...resOfProps}
        >
          {children}
        </div>
      )}
    </>
  );
};
