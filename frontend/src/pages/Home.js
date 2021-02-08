import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Container from "../components/common/Container";
import { ReactComponent as FinanceIllustrator } from "./../assets/personal_finance.svg";

const Home = () => {
  return (
    <Container className="bg-white pt-4">
      <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between w-full h-96">
        <div className="w-full lg:w-2/5">
          <h1>
            <span className="block text-3xl font-bold">Personal Finance</span>
            <span className="text-4xl font-extrabold">Data Analytics</span>
          </h1>
          <p className="mt-5 mb-7 text-xl">
            Explore your financial data like never before.
          </p>
          <Link to="/register">
            <Button>Let's Get Started</Button>
          </Link>
        </div>
        <div className="w-2/4 hidden lg:block">
          <div className="finance-illustrator">
            <FinanceIllustrator className="w-full" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
