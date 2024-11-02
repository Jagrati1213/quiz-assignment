import React from "react";

export function QuizCard({ quizData, selectedOptions, setSelectedOptions }) {
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
  };

  return (
    <div className="flex flex-col gap-8 max-h-[500px] overflow-y-scroll py-4">
      <h3 className="text-xl text-upraisedBlack font-semibold font-sans">
        {quizData?.question}
      </h3>

      <div className="flex flex-col gap-4">
        {quizData?.options.map((option, index) => {
          const isSelected = selectedOptions.includes(option);
          return (
            <label
              htmlFor={`${option}`}
              className={`${
                isSelected ? "border-upraisedGreen" : "border-upraisedGray"
              } px-6 py-8 rounded-[20px] border-2 transition flex gap-2 cursor-pointer`}
              key={index}
            >
              <input
                type={quizData?.type === "multiple" ? "checkbox" : "radio"}
                checked={isSelected}
                onChange={() => handleChange(option)}
                readOnly
                id={`${option}`}
                className="upraised_option"
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
