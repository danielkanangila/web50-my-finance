import React from "react";
import Spinner from "./Spinner";

const PageLoader = ({ visibility = false, message }) => {
  if (visibility)
    return (
      <div className="absolute page-loader w-full top-0 h-50 flex flex-col justify-center items-center">
        <Spinner size="10" />
        <div className="my-2"></div>
        <h1 className="animate-pulse text-lg font-semibold text-gray-300">
          {message}
        </h1>
      </div>
    );
  else return <></>;
};

export default PageLoader;
