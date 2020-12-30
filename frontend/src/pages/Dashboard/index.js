import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";

const Dashboard = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="body-container flex">
        <div className="sidebar"></div>
        <div className="right">
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
