import React from "react";
import { FlexBox } from "../../components/common";
import { SidebarItem } from "../../components/common/Sidebar";
import useAuth from "../../hooks/useAuth";
import {
  ChartBar,
  Home as HomeIcon,
  Logout,
  SwitchVertical,
} from "./../../components/icons";

const SidebarMenu = () => {
  const auth = useAuth();

  return (
    <div className="sidebar-menu mt-2">
      <SidebarItem to={`/${auth.user.id}`}>
        <FlexBox>
          <HomeIcon className="icon small mr-2" /> Home
        </FlexBox>
      </SidebarItem>
      <SidebarItem to={`/${auth.user.id}/transactions`}>
        <FlexBox>
          <SwitchVertical className="icon small mr-2" /> Transactions
        </FlexBox>
      </SidebarItem>
      <SidebarItem to={`/${auth.user.id}/statics`}>
        <FlexBox>
          <ChartBar className="icon small mr-2" /> Statics
        </FlexBox>
      </SidebarItem>
      <SidebarItem to="/logout">
        <FlexBox>
          <Logout className="icon small mr-2 text-red-800" />
          Logout
        </FlexBox>
      </SidebarItem>
    </div>
  );
};

export default SidebarMenu;
