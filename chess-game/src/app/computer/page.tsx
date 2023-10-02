"use client"
import React, { useState, useEffect } from 'react';
import Board from '../../components/Board/ComputerBoard';

type Props = {}

const PlayWithComputer: React.FC<Props> = () => {
  const [player, setPlayer] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!showModal) {
      const timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [showModal]);

  if (showModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-lg">
          <h2>Enter Your Name</h2>
          <input
            type="text"
            placeholder="Player"
            onChange={(e) => setPlayer(e.target.value)}
            className="border p-2 m-2"
          />
          <button
            onClick={() => setShowModal(false)}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="md:flex m-5 justify-center flex-col items-center">
      <h1 className="text-2xl mb-4">You vs Computer</h1>
      <div className="flex justify-between w-full mb-4">
        <div className="flex items-center">
          <i className="fas fa-user mr-2"></i>
          <h2>{player}</h2>
        </div>
        <div className="flex items-center">
          <i className="fas fa-robot mr-2"></i>
          <h2>Computer</h2>
        </div>
      </div>
      <div className="text-center mb-4">
        <h2>Elapsed Time: {elapsedTime}s</h2>
      </div>
      <Board />
    </div>
  );
};

export default PlayWithComputer;
