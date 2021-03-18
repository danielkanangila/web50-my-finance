import React from "react";
import Container from "../../components/common/Container";

const Dashboard = ({ children }) => {
  return (
    <div className="w-full pb-20">
      <Container>{children}</Container>
    </div>
  );
};

export default Dashboard;
