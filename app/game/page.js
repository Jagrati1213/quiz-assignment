"use client";
import { useEffect, useState } from "react";
import { QuizCard } from "../components/Game/QuizCard";
import { TimerComponent } from "../components/Game/TimerComponent";
import { ScoreBlock } from "../components/Game/ScoreBlock";
import axios from "axios";
import { Skeleton } from "../components/Skeleton";

export default function Game() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Internal server error', error.response?.statusText || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function show next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
    } else {
      setIsQuizCompleted(true);
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
    <section className="upraised_game_container flex flex-col bg-white">
      {/* Header image */}
      <div className="bg-upraisedGameImage bg-no-repeat py-20"></div>

      {/* quiz questions container */}
      <div className="bg-white rounded-tl-[60px] rounded-tr-[60px] flex-1 pt-10 px-3">
        {isQuizCompleted
          ? <ScoreBlock correctCount={2} inCorrectCount={7} />
          :
          loading
            ? <Skeleton />
            : <>
              {/* timer*/}
              <TimerComponent currentCount={currentQuestionIndex + 1} totalCount={questions?.length} />
              {/* question with answer */}
              <div className="px-2">
                <QuizCard quizData={questions[currentQuestionIndex]} />
              </div>
            </>
        }
      </div>

      {/* next button */}
      <div className="w-full bg-white p-4">
        {isQuizCompleted
          ? <button className="upraised_button relative text-center" onClick={handleRestart}>Start Again</button>
          : <button className="upraised_button relative text-center" onClick={handleNext}>
            Next<span className="absolute right-10">&#8594;</span>
          </button>
        }
      </div>

    </section>
  )
}