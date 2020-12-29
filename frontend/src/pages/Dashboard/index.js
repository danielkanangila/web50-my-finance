import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";

const Dashboard = () => {
  return <Route path="/" component={Home} />;
};

export default Dashboard;
