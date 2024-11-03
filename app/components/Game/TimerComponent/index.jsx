import React, { useMemo } from "react";

export function TimerComponent({ remainingTime, currentCount, totalCount }) {
  const timerColor = remainingTime > 5 ? "#44B77B" : "#FF0000";

  // Calculate the timer
  const gaugeValue = useMemo(() => {
    return (15 - remainingTime) * (360 / 15);
  }, [remainingTime]);

  return (
    <div className="flex flex-col items-center justify-center absolute w-[90%]">
      <div
        className="w-24 h-24 rounded-full flex justify-center items-center relative -top-[80px] transition-all"
        style={{
          backgroundImage: `conic-gradient(
          #D3D3D3 0deg,
          #D3D3D3 ${gaugeValue}deg,
          ${timerColor} ${gaugeValue}deg,
          ${timerColor} 360deg
        )`,
        }}
      >
        <div className="bg-white w-20 h-20 rounded-full flex justify-center items-center">
          <h2 className="text-4xl font-bold italic text-black">
            {currentCount}
            <span className="text-gray-400 text-xl">/{totalCount}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
