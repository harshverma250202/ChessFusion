import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState<Chess>(new Chess());
  const [isWhiteNext, setIsWhiteNext] = useState<boolean>(true);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [showInvalidMovePopup, setShowInvalidMovePopup] = useState<boolean>(false);
  const [showGameOverPopup, setShowGameOverPopup] = useState<boolean>(false);

  useEffect(() => {
    updateLegalMoves();
    checkGameOver();
  }, [game]);

  function updateLegalMoves() {
    const moves = game.moves();
    setLegalMoves(moves);
  }

  function checkGameOver() {
    if (game.isCheckmate() || game.isDraw()) {
      setShowGameOverPopup(true);
    }
  }

  function makeAMove(move: chessjs.Move | string): chessjs.Move | null {
    const gameCopy = new Chess(game.fen()); // Copy the game state

    let result: chessjs.Move | null = null;

    try{
      result=gameCopy.move(move);
    }
    catch{
      setShowInvalidMovePopup(true);
      setTimeout(() => setShowInvalidMovePopup(false), 500); // Show the invalid move popup for 2 seconds
      return null;
    }

    
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if legal
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    if(move===null){
      return false;
    }
    setIsWhiteNext(!isWhiteNext);
    return true;
  }

  const boardSize = "80vh"; // Set the desired board size here

  return (
    <div style={{ width: boardSize }}>
      {showInvalidMovePopup && <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-red-500 text-white p-5 rounded-lg">
          Invalid Move
        </div>
      </div>}
      {showGameOverPopup && <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-green-500 text-white p-5 rounded-lg">
          Game Over
        </div>
      </div>}
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        boardOrientation={isWhiteNext ? "white" : "black"}
      />
    </div>
  );
}

declare namespace chessjs {
  interface Move {
    from: string;
    to: string;
    promotion?: string;
  }
}
