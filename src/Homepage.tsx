// HomePage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "./assets/Images/BG.jpg"; 

const quotes: string[] = [
  "Time is what we want most, but what we use worst. – William Penn",
  "Lost time is never found again. – Benjamin Franklin",
  "The key is in not spending time, but in investing it. – Stephen R. Covey",
  "It’s not enough to be busy, so are the ants. The question is, what are we busy about? – Henry David Thoreau",
];

const HomePage: React.FC = () => {
  const [quote, setQuote] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  const handleStart = (): void => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-[28rem] sm:h-[32rem] md:h-[36rem] lg:h-[40rem]
                   rounded-xl shadow-xl p-6 sm:p-8 flex flex-col justify-center text-center
                   bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>

        <div className="relative z-10 flex flex-col items-center px-4 sm:px-6">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6">
            OFFLINE TIME TRACKER
          </h1>

          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-2">
            (Quote of the day)
          </h2>

          {/* Random Quote */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-6 px-2 sm:px-4">
            {quote}
          </p>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 text-white text-base sm:text-lg md:text-xl rounded-xl font-bold hover:bg-indigo-700 hover:scale-105 hover:shadow-lg transition transform duration-300"
          >
            START
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
