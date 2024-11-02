'use client'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push('/game'); // Navigates to the "Game" page
  }
  return (
    <section className="upraised_container">
      <div className="flex justify-between items-center gap-2 flex-col w-full mx-5 md:mx-10">
        {/* logo */}
        <div>
          <h2 className="text-3xl font-bold text-upraisedBlack font-sans">upraised</h2>
        </div>

        {/* quiz sign */}
        <div className="upraised_quiz_sign_container">
          <h1 className="font-extrabold font-sans text-4xl md:text-5xl">Quiz</h1>
        </div>

        {/* start button */}
        <button className="upraised_button" onClick={handleNavigate}>
          Start
        </button>
      </div>
    </section >
  );
}
