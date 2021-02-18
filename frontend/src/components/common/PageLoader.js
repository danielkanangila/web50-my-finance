import React from "react";
import Spinner from "./Spinner";

const PageLoader = ({ visibility = false, message }) => {
  if (visibility)
    return (
      <div className="absolute w-full h-screen bg-white top-0 flex flex-col justify-center items-center">
        <Spinner size="8" color="green" />
        <div className="my-2"></div>
        <h1 className="animate-pulse text-xl font-semibold text-gray-300">
          {message}
        </h1>
      </div>
    );
  else return <></>;
};

export default PageLoader;
