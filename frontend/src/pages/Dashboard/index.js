import React from "react";
import {
  Sidebar,
  SidebarLayout,
  SidebarLayoutMain,
} from "../../components/common/Sidebar";
import Header from "./Header";

import LinkBankButton from "../../components/LinkBankButton";
import SidebarMenu from "./SidebarMenu";
import UserInfo from "./UserInfo";
import Logo from "../../components/common/Logo";

const Dashboard = ({ children }) => {
  return (
    <SidebarLayout>
      <SidebarLayoutMain width="16rem">
        <Sidebar className="bg-white shadow">
          <div className="flex justify-center p-2 mb-4">
            <Logo />
          </div>
          <UserInfo />
          <div className="mb-6 lg:hidden">
            <LinkBankButton />
          </div>
          <SidebarMenu />
        </Sidebar>
        <div className="w-screen content">
          <Header />
          {children}
        </div>
        <div className="mb-10"></div>
      </SidebarLayoutMain>
    </SidebarLayout>
  );
};

export default Dashboard;
