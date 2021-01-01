import React from "react";
import styled from "styled-components";

const css = String.raw;
export const Sidebar = ({ className, children, ...resOfProps }) => {
  return (
    <div
      className={`sidebar relative h-full min-h-screen ${
        className ? className : ""
      }`}
      {...resOfProps}
    >
      {children}
    </div>
  );
};

export const SidebarLayout = ({ className, children, ...resOfProps }) => {
  return (
    <div className={`h-screen ${className ? className : ""}`} {...resOfProps}>
      {children}
    </div>
  );
};

export const SidebarLayoutMain = styled.div`
  ${({ options = { sidebarWidth: "6rem" } }) => css`
    display: grid;
    grid-template-columns: ${options.sidebarWidth} auto;
  `}
`;
