import React from "react";

export function TimerComponent({ currentCount, totalCount }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative -top-[80px] w-28 h-28 flex items-center justify-center bg-white rounded-full">
        <div
          className="absolute w-[85%] h-[85%] rounded-full border-8 border-upraisedGreen"
          style={{
            clipPath: "circle(50% at 50% 50%)",
            animation: "countdown 5s linear infinite",
          }}
        ></div>
        <h2 className="text-4xl font-bold italic">
          {currentCount}
          <span className="text-gray-400 text-xl">/{totalCount}</span>
        </h2>
      </div>
    </div>
  );
}
