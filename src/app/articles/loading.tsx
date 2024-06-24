import React from "react";
const a = [1, 2, 3, 4, 5];
const Loading = () => {
  return (
    <div className="fix-height px-5 m-auto container animate-pulse">
      <div className="my-5 w-full md:w-2/3 m-auto bg-gray-300 h-12 rounded"></div>
      <div className="flex items-center justify-center flex-wrap gap-7">
        {a.map((i) => (
          <div
            key={i}
            className="p-5 rounded-lg my-1 bg-gray-200 w-full md:w-2/5 lg:w-1/4"
          >
            <h3 className="h-6 bg-gray-300"></h3>
            <p className="my-2 bg-gray-300 p-1 h-10"></p>
            <div className="w-full block p-1 bg-gray-400 rounded-lg h-8"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
