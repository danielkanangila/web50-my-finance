import React, { useContext } from "react";
import { FlexBox } from "../../components/common";
import {
  SidebarContext,
  SidebarItem,
  actions,
} from "../../components/common/Sidebar";
import useAuth from "../../hooks/useAuth";
import {
  Home as HomeIcon,
  Logout,
  SwitchVertical,
} from "./../../components/icons";

const SidebarMenu = () => {
  const auth = useAuth();
  const dispatch = useContext(SidebarContext)[1]; // to update header title

  const updateHearTitle = (title) => {
    dispatch({
      type: actions.UPDATE_HEADER_TITLE,
      payload: title,
    });
    return true; // do not prevent link (a) behaviour
  };

  return (
    <div className="sidebar-menu mt-2">
      <SidebarItem
        onClick={() => updateHearTitle("Dashboard")}
        to={`/${auth?.user?.id}`}
      >
        <FlexBox>
          <HomeIcon className="icon small mr-2" /> Dashboard
        </FlexBox>
      </SidebarItem>
      <SidebarItem
        onClick={() => updateHearTitle("Transactions History")}
        to={`/${auth?.user?.id}/transactions`}
      >
        <FlexBox>
          <SwitchVertical className="icon small mr-2" /> Transactions History
        </FlexBox>
      </SidebarItem>
      {/* <SidebarItem
        onClick={() => updateHearTitle("Statistics")}
        to={`/${auth?.user?.id}/statistics`}
      >
        <FlexBox>
          <ChartBar className="icon small mr-2" /> Statistics
        </FlexBox>
      </SidebarItem> */}
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
