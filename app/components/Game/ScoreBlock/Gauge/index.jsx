import React from "react";

export function Gauge({ percentage }) {
  const getColor = (value) => {
    if (value <= 10) return "#FF0000"; // Red
    if (value <= 30) return "#FFA500"; // Orange
    if (value <= 60) return "#FDD835"; // Yellow
    return "#4CAF50"; // Green
  };

  const gaugeValue = Math.min(Math.max(percentage, 0), 100); // Clamps the value between 0 and 100

  return (
    <div className="flex w-full justify-center relative">
      <div
        className="w-36 h-36 rounded-full flex justify-center items-center"
        style={{
          backgroundImage: `conic-gradient(
            ${getColor(gaugeValue)} ${gaugeValue * 3.6}deg, 
            #D3D3D3 ${gaugeValue * 3.6}deg
        )`,
          transition: "background 0.5s ease",
        }}
      >
        <div className="bg-white w-28 h-28 rounded-full flex justify-center items-center">
          <div
            className={`${
              percentage >= 100
                ? "px-6 py-9"
                : percentage < 10
                ? "px-8 py-8"
                : "px-6 py-8"
            } rounded-full border-4 border-gray-200`}
          >
            <span className="text-2xl font-bold">{gaugeValue}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
