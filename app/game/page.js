"use client";
import { useEffect, useState } from "react";
import { QuizCard } from "../components/Game/QuizCard";
import { TimerComponent } from "../components/Game/TimerComponent";
import { ScoreBlock } from "../components/Game/ScoreBlock";
import axios from "axios";
import { Skeleton } from "../components/Skeleton";
import { Toast } from "../components/Toast";

export default function Game() {
  const [initialTime] = useState(15);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isShowToaster, setIsShowToaster] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(15);
  const [userQuizResponse, setUserQuizResponse] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [toastMessage, setToastMessage] = useState("Answer submitted successfully");

  const [score, setScore] = useState({
    correctScore: 0,
    inCorrectScore: 0
  })

  // Function calculate the scoring
  const handleCalculateScore = () => {
    let correctCount = 0;
    let incorrectCount = 0;

    userQuizResponse.forEach(({ correct_answer, selectedAnswers }) => {
      // Ensure correct_answer is treated as an array
      const correctAnswersArray = Array.isArray(correct_answer)
        ? correct_answer
        : [correct_answer];

      // Check all selected options includes inside correct answer
      const isCorrect = correctAnswersArray.every(answer => selectedAnswers.includes(answer)) &&
        selectedAnswers.length === correctAnswersArray.length;

      //Update the score 
      if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    // Set the score in state
    setScore({
      correctScore: correctCount,
      inCorrectScore: incorrectCount
    });
  };

  // Function fetch all the quiz questions
  const handleGetAllQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/quiz');
      if (response.status !== 200) {
        console.error('Unexpected response status:', response.statusText);
        return;
      };

      const data = await response.data;
      setQuestions(data);
    } catch (error) {
      console.error('Internal server error', error.response?.statusText || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to send the response to the API before the next question
  const handleSendResponse = async () => {
    try {
      const payload = {
        selectedAnswers: selectedOptions,
        question: questions[currentQuestionIndex].question,
        correct_answer: questions[currentQuestionIndex].correct_answer,
        time: `${initialTime - remainingTime}s`
      };

      const response = await axios.post('/api/quiz', payload);
      return response;
    } catch (error) {
      console.error('Error while sending response to API:', error.response?.statusText || error.message);
    }
  };

  // Function next question
  const handleNext = async ({ timeOut = false }) => {
    try {
      // Ensure user has chosen an option
      if (!selectedOptions.length && !timeOut) return;

      // Send selected answer to backend(dummy).
      const response = await handleSendResponse();
      if (response.status !== 200) {
        console.error("Error in submitting user answer", response?.statusText);
        return;
      }
      // Show toaster message
      timeOut && selectedOptions.length === 0 ? setToastMessage("Oops, Time is out!") : setToastMessage("Answer submitted successfully!");

      setIsShowToaster(true);

      // Append response data to "userQuizResponse" state
      setUserQuizResponse((prevResponses) => [...prevResponses, { ...response.data.data }]);

      // Proceed to the next question or complete the quiz
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setRemainingTime(15);
        setTimerRunning(true);
        setSelectedOptions([]);
      }
      else {
        setIsQuizCompleted(true);
        setTimerRunning(false);
      }
    } catch (error) {
      console.error('Internal server error', error.response?.statusText || error.message);
    }
    finally {
      // Hide the toaster after a short delay
      setTimeout(() => setIsShowToaster(false), 2000);
    }
  }

  // Function restart the game
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
    setUserQuizResponse([]);
    setRemainingTime(15);
    setTimerRunning(true);
  }

  // Handle time effect to count down
  useEffect(() => {
    if (timerRunning && remainingTime > 0) {
      console.log("object");
      const timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (remainingTime === 0) {
      handleNext({ timeOut: true });
    }
  }, [timerRunning, remainingTime]);

  // Handle scoring 
  useEffect(() => {
    if (isQuizCompleted) {
      handleCalculateScore();
    }
  }, [userQuizResponse, isQuizCompleted]);

  // Fetched all questions on initial load
  useEffect(() => {
    handleGetAllQuestions();
  }, []);

  return (
    <section className="upraised_game_container flex flex-col bg-white relative">
      {/* Show toaster message */}
      <Toast message={toastMessage} show={isShowToaster} />

      {/* Header image */}
      <div className="bg-upraisedGameImage bg-no-repeat py-20"></div>

      {/* quiz questions container */}
      <div className="bg-white rounded-tl-[60px] rounded-tr-[60px] flex-1 pt-10 px-3">
        {isQuizCompleted
          ? <ScoreBlock
            correctCount={score.correctScore}
            inCorrectCount={score.inCorrectScore} />
          : loading
            ? <Skeleton />
            : <>
              {/* timer*/}
              <TimerComponent
                remainingTime={remainingTime}
                currentCount={currentQuestionIndex + 1 || 0}
                totalCount={questions?.length || 0} />

              {/* question with answer */}
              <div className="px-2">
                <QuizCard
                  quizData={questions[currentQuestionIndex]}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions} />

              </div>
            </>
        }
      </div>

      {/* next button */}
      <div className="w-full bg-white p-4">
        {isQuizCompleted
          ? <button
            className="upraised_button relative text-center"
            onClick={handleRestart}>Start Again</button>
          : <button
            className="upraised_button relative text-center disabled:bg-gray-200 disabled:text-gray-400"
            onClick={handleNext}
            disabled={selectedOptions.length === 0}>
            Next<span className="absolute right-10">&#8594;</span>
          </button>
        }
      </div>

    </section>
  )
}