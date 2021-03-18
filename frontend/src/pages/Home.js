import React from "react";
import { Link, Redirect, Route } from "react-router-dom";
import Button from "../components/common/Button";
import Section from "../components/common/Section";
import PricingCard from "../components/common/PricingCard";
import { ReactComponent as FinanceIllustrator } from "./../assets/personal_finance.svg";
import bankIconList from "./../components/icons/BankIcons";
import { ReactComponent as TransferMoneyIllustration } from "./../assets/transfer_money.svg";
import useAuth from "../hooks/useAuth";

const pricing = [
  {
    planName: "Free / 30 Days",
    planDescription: "Visualize your bank transfers in one place.",
    price: "$0.00",
    paymentFrequency: "month",
    planOptions: ["Bank Transactions Analytics", "-", "-", "-"],
  },
  {
    planName: "Standard",
    planDescription: "Full features",
    price: "$4.99",
    paymentFrequency: "month",
    planOptions: [
      "Bank Transactions Analytics",
      "Money Transfers",
      "Daily Report",
      "Income Statement",
    ],
  },
];

const Home = () => {
  return (
    <>
      <Section className="bg-white py-10">
        <div className="flex flex-col lg:flex-row-reverse pt-10 pb-20 lg:items-center lg:justify-between w-full lg:h-96">
          <div className="w-full lg:w-2/5">
            <h1>
              <span className="block text-3xl font-bold">Personal Finance</span>
              <span className="text-4xl font-extrabold">Data Analytics</span>
            </h1>
            <p className="mt-5 mb-7 text-xl">
              Explore your financial data like never before.
            </p>
            <Link to="/register">
              <Button width="w-auto lg:w-full">Let's Get Started</Button>
            </Link>
          </div>
          <div className="w-2/4 hidden lg:block">
            <div className="finance-illustrator">
              <FinanceIllustrator className="w-full" />
            </div>
          </div>
        </div>
      </Section>
      <Section className="bg-gray-900" id="howItWorks">
        <div className="w-full py-20">
          <h1 className="font-extrabold text-3xl text-center text-white lg:pb-10">
            Your Bank Accounts in One Place
          </h1>
          <div className="flex mt-10 lg:mt-10 flex-col lg:flex-row lg:items-center w-full">
            <div className="w-full pb-10 text-left lg:w-3/5 lg:pr-12">
              <p className="text-xl text-white mb-5 leading-loose">
                We are using Plaid API to integrates with more than 10,000
                financial institutions around the world.
              </p>
              <p className="text-xl text-white leading-loose">
                Improve your financial health or your keep finance healthy by
                using our platform to track and visualize your financial
                transactions. We are getting your bank transactions to analyze
                them in a manner to help you to better visualize them.
              </p>
            </div>
            <div className="w-full md:w-3/5 md:mx-auto mt-5 lg:m-0 lg:w-2/5 flex flex-wrap items-center justify-between p-10 rounded-md bg-white">
              {bankIconList.map((BankIcon, index) => (
                <BankLogo Logo={BankIcon} key={index} />
              ))}
            </div>
          </div>
        </div>
      </Section>
      <Section className="py-12 bg-green-400">
        <div className="flex flex-col-reverse lg:flex-row justify-center items-center lg:px-60">
          <div>
            <TransferMoneyIllustration />
          </div>
          <h1 className="text-3xl ml-10 mb-5 lg:mb-0 text-left md:text-center lg:text-left text-white font-LexendMega">
            Easily send money to your friends and family.
          </h1>
        </div>
      </Section>
      <Section className="pricing-table-2 py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-extrabold text-3xl text-center lg:pb-5">
              Pricing Plans
            </h1>
            <p className="text-gray-500 text-xl xl:mx-12">
              Choose a plan that best suits your budget.
            </p>
          </div>
          <div className="pricing-plans flex flex-col lg:flex-row flex-wrap justify-center lg:-mx-4 mt-6 md:mt-12">
            {pricing.map((price, index) => (
              <PricingCard {...price} key={index} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
};

const BankLogo = ({ Logo, name = "", className, onClick = () => {} }) => {
  return (
    <div className={`bank-logo ${className}`}>
      <img src={Logo} alt={name} />
    </div>
  );
};

const RenderHome = (props) => {
  const auth = useAuth();

  return (
    <Route
      {...props}
      render={(comProps) => {
        if (auth?.user?.id) return <Redirect to={`/users/${auth?.user?.id}`} />;
        return <Home {...comProps} />;
      }}
    />
  );
};

export default RenderHome;
