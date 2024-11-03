import Image from "next/image";
import React from "react";

export function QuizCard({
  quizData,
  selectedOptions,
  setSelectedOptions,
  setTimerRunning,
}) {
  // Handle option selection
  const handleChange = (option) => {
    if (quizData.type === "multiple") {
      // For multiple choice, toggle the selection
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    } else {
      setSelectedOptions([option]);
    }
    setTimerRunning(false);
  };

  return (
    <div className="flex flex-col gap-8 max-h-[500px] overflow-y-scroll py-4 text-black">
      <h3 className="text-xl text-black font-semibold font-sans">
        {quizData?.question}
      </h3>
      {quizData?.image && (
        <div className="w-full flex justify-center">
          <Image
            src={quizData.image}
            alt="quiz image"
            width={180}
            height={180}
          />
        </div>
      )}
      <div className="flex flex-col gap-4">
        {quizData?.options.map((option, index) => {
          const isSelected = selectedOptions.includes(option);
          return (
            <label
              htmlFor={`${option}`}
              className={`${
                isSelected ? "border-upraisedGreen" : "border-gray-400"
              } px-6 py-8 rounded-[20px] border-2 transition flex gap-2 cursor-pointer text-black`}
              key={index}
              style={{ color: "black" }}
            >
              <input
                type={quizData?.type === "multiple" ? "checkbox" : "radio"}
                checked={isSelected}
                onChange={() => handleChange(option)}
                readOnly
                id={`${option}`}
                name={quizData?.type === "multiple" ? undefined : "quizOption"}
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );
}
