import React from "react";
import Spinner from "./Spinner";

const Loader = ({ visibility, message }) => {
  if (visibility)
    return (
      <div className="flex flex-col items-center justify-center w-full p-10">
        <Spinner size={10} />
        <span className="text-sm text-gray-400 mt-3">{message}</span>
      </div>
    );
  else return <></>;
};

export default Loader;
