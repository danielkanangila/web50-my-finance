import React from "react";
import { Link } from "react-router-dom";

const AuthFooter = ({ to, message, linkTitle }) => {
  return (
    <div className="mt-5 mb-3 text-sm">
      {message}
      <Link
        className="transition duration-500 ease-in-out text-green-500 hover:underline"
        to={to}
      >
        {linkTitle}
      </Link>
    </div>
  );
};

export default AuthFooter;
