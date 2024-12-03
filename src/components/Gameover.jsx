/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function GameOverPopup({ isVisible, onTryAgain, score }) {


  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex  justify-center items-center z-50">
      <div className="bg-white p-6 px-10 rounded-lg shadow-lg text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Game Over</h1>
        <p className="text-lg text-gray-600">Your Score: <span className="font-bold text-green-500">{score}</span></p>

        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          onClick={onTryAgain}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
