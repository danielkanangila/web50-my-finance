import React from "react";

const CardLoader = () => {
  return (
    <div className="animate-pulse relative border border-gray-300 px-8 rounded-md w-80 h-44">
      <div className="absolute w-16 h-5 bg-gray-300 right-2 top-2 rounded-full"></div>
      <div className="my-12"></div>
      <div className="relative w-12 h-8 border border-gray-300 rounded-md flex items-center">
        <span className="block w-full py-1 border-t border-b border-gray-300"></span>
        <span className="block h-full w-4 border border-gray-300 rounded-full absolute left-4 bg-white"></span>
      </div>
      <div className="flex w-full justify-between mt-3">
        <span className="w-1/5 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-1/5 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-1/5 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-1/5 h-2 bg-gray-300 rounded-full"></span>
      </div>
      <div className="w-3/4 flex mt-3 ml-4 justify-between items-center">
        <span className="w-16 h-2 bg-gray-300 rounded-full"></span>
        <div className="w-3/6 flex items-center text-gray-300">
          <span className="block w-4 h-2 bg-gray-300 rounded-full"></span>/
          <span className="block w-4 h-2 bg-gray-300 rounded-full"></span>
        </div>
      </div>
      <div className="w-3/5 mt-2 flex justify-between">
        <span className="w-5/12 h-2 bg-gray-300 rounded-full"></span>
        <span className="w-5/12 h-2 bg-gray-300 rounded-full"></span>
      </div>
    </div>
  );
};

export default CardLoader;
