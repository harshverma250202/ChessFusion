import React, { useState } from 'react';

type Props = {
  onCreateGame: (name: string) => void;
  onJoinGame: (name: string, gameId: string) => void;
};

const CreateOrJoinGame: React.FC<Props> = ({ onCreateGame, onJoinGame }) => {
  const [createName, setCreateName] = useState('');
  const [joinName, setJoinName] = useState('');
  const [gameId, setGameId] = useState('');

  const handleCreateGame = () => {
    onCreateGame(createName);
  };

  const handleJoinGame = () => {
    onJoinGame(joinName, gameId);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/3">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-col items-center space-y-2 border-b pb-4">
            <input
              type="text"
              placeholder="Your Name"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={handleCreateGame}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create New Game
            </button>
          </div>
            <div className="text-gray-500">OR</div>
          <div className="flex flex-col items-center space-y-2">
            <input
              type="text"
              placeholder="Your Name"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
              className="border p-2 rounded"
            />
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Enter Game ID"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="border p-2 rounded"
              />

            </div>
            <button
                onClick={handleJoinGame}
                className="bg-green-500 text-white p-2 rounded"
              >
                Join Game
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrJoinGame;
