"use client";
import { useEffect, useState } from "react";
import { QuizCard } from "../components/Game/QuizCard";
import { TimerComponent } from "../components/Game/TimerComponent";
import { ScoreBlock } from "../components/Game/ScoreBlock";
import axios from "axios";
import { Skeleton } from "../components/Skeleton";
import { Toast } from "../components/Toast";

export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isShowToaster, setIsShowToaster] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userQuizResponse, setUserQuizResponse] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState({
    correctScore: 0,
    inCorrectScore: 0
  })

  // Function fetch all the quiz questions
  const handleGetAllQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/quiz');
      if (response.status === 200) {
        const data = await response.data;
        setQuestions(data);
      }
      else {
        console.error('Unexpected response status:', response.statusText);
      }
    } catch (error) {
      console.error('Internal server error', error.response?.statusText || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function next question
  const handleNext = async () => {
    try {
      // Case-1: If user choose any option.
      if (selectedOptions.length) {

        // Case-2: send selected answer to api.
        const response = await axios.post('/api/quiz',
          {
            selectedAnswers: selectedOptions,
            question: questions[currentQuestionIndex].question,
            correct_answer: questions[currentQuestionIndex].correct_answer,
            time: "15s"
          })
        if (response.status === 200) {
          setIsShowToaster(true);

          // Case-3: Set the data in "userQuizResponse"
          setUserQuizResponse((prevResponses) => [
            ...prevResponses,
            {
              ...response.data.data
            }
          ]);

          // Case-4: Show the next question
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
            setSelectedOptions([]);
          } else {

            // Case-5: Update the score 
            setIsQuizCompleted(true);
          }
        } else {
          console.log("Error in submitting user answer", response?.statusText);
        }
      }
    } catch (error) {
      console.error('Internal server error', error.response?.statusText || error.message);
    }
    finally {
      setTimeout(() => {
        setIsShowToaster(false);
      }, 3000);
    }
  }

  // Function restart the game
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
  }

  useEffect(() => {
    handleGetAllQuestions();
  }, []);


  return (
    <section className="upraised_game_container flex flex-col bg-white relative">

      <Toast message={'Answer submitted successfully!'} show={isShowToaster} />

      {/* Header image */}
      <div className="bg-upraisedGameImage bg-no-repeat py-20"></div>

      {/* quiz questions container */}
      <div className="bg-white rounded-tl-[60px] rounded-tr-[60px] flex-1 pt-10 px-3">
        {isQuizCompleted
          ? <ScoreBlock correctCount={score.correctScore} inCorrectCount={score.inCorrectScore} />
          :
          loading
            ? <Skeleton />
            : <>
              {/* timer*/}
              <TimerComponent currentCount={currentQuestionIndex + 1} totalCount={questions?.length} />
              {/* question with answer */}
              <div className="px-2">
                <QuizCard quizData={questions[currentQuestionIndex]} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
              </div>
            </>
        }
      </div>

      {/* next button */}
      <div className="w-full bg-white p-4">
        {isQuizCompleted
          ? <button className="upraised_button relative text-center" onClick={handleRestart}>Start Again</button>
          : <button className="upraised_button relative text-center disabled:bg-gray-200 disabled:text-gray-400"
            onClick={handleNext} disabled={selectedOptions.length === 0}>
            Next<span className="absolute right-10">&#8594;</span>
          </button>
        }
      </div>

    </section>
  )
}