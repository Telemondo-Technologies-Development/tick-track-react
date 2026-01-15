import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/app"); // Navigate to the App page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-[700px] h-[600px] flex flex-col justify-center"
              style={{
                backgroundImage: "url('public/Images/Background.png')", // Replace with your image path
                backgroundSize: "cover", // Ensures the image covers the entire box
                backgroundPosition: "center", // Centers the image
                backgroundRepeat: "no-repeat",
              }}>
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Welcome to Tick-Track!
        </h1>
        <p className="text-gray-600 mt-4 text-center">
          Track your tasks and shifts effortlessly with our system. Get started
          by navigating through the tabs.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleGetStarted}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;