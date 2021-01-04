import React, { useContext } from "react";
import { SidebarContext } from "../../components/common/Sidebar";

const HeaderTitle = () => {
  const [state] = useContext(SidebarContext);
  return <h1 className="font-bold text-lg">{state.headerTitle}</h1>;
};

export default HeaderTitle;
