import { QuizCard } from "../components/Game/QuizCard";
import { TimerComponent } from "../components/Game/TimerComponent";

export default function Game() {

  return (
    <section className="upraised_game_container flex flex-col bg-white">
      {/* Header image */}
      <div className="bg-upraisedGameImage bg-no-repeat py-20"></div>

      {/* quiz questions container */}
      <div className="bg-white rounded-tl-[60px] rounded-tr-[60px] flex-1 pt-10 px-3">
        {/* timer*/}
        <TimerComponent currentCount={1} totalCount={5} />

        {/* question with answer */}
        <div className="px-2">
          <QuizCard quizData={{
            question: "What are your favorite fruits?",
            options: ["Apple", "Banana", "Cherry", "Date"],
            type: "single"
          }} />
        </div>
      </div>

      {/* next button */}
      <div className="w-full bg-white">
        <button className="upraised_button relative text-center">
          Next
          <span className="absolute right-10">&#8594;</span>
        </button>
      </div>

    </section>
  )
}