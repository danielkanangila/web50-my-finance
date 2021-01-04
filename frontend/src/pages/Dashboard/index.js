import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Sidebar,
  SidebarLayout,
  SidebarLayoutMain,
} from "../../components/common/Sidebar";
import Header from "./Header";
import Home from "./Home";

import LinkBankButton from "../../components/LinkBankButton";
import SidebarMenu from "./SidebarMenu";

const Dashboard = () => {
  return (
    <SidebarLayout>
      <SidebarLayoutMain options={{ sidebarWidth: "16rem" }}>
        <Sidebar className="bg-white shadow pt-10">
          <div className="mb-6 lg:hidden">
            <LinkBankButton />
          </div>
          <SidebarMenu />
        </Sidebar>
        <div className="w-screen lg:w-auto">
          <Header />
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </SidebarLayoutMain>
    </SidebarLayout>
  );
};

export default Dashboard;
