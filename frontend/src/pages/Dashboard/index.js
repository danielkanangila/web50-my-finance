import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Sidebar,
  SidebarLayout,
  SidebarLayoutMain,
} from "../../components/common/Sidebar";
import Header from "./Header";
import Home from "./Home";

const Dashboard = () => {
  return (
    <SidebarLayout>
      <Header />
      <SidebarLayoutMain className="pt-12" options={{ sidebarWidth: "16rem" }}>
        <Sidebar className="bg-white shadow"></Sidebar>
        <div className="w-auto">
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </SidebarLayoutMain>
    </SidebarLayout>
  );
};

export default Dashboard;
