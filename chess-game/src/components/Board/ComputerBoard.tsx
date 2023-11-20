"use client"
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

  useEffect(() => {
    if (!isWhiteNext) {
      makeBestMoveWrapper();
    }
  }, [isWhiteNext]);

  function updateLegalMoves() {
    const moves = game.moves();
    setLegalMoves(moves);
  }

  function checkGameOver() {
    if (game.isCheckmate() || game.isDraw() || game.isStalemate()) {
      setShowGameOverPopup(true);
      return true;
    }
    return false;
  }
  function checkGameOverInMinMax() {
    if (game.isCheckmate() || game.isDraw() || game.isStalemate()) {
      return true;
    }
    return false;
  }

  function makeAMove(move: chessjs.Move | string): chessjs.Move | null {
    const gameCopy = new Chess(game.fen()); // Copy the game state
    let result: chessjs.Move | null = null;

    try {
      result = gameCopy.move(move);
    } catch {
      setShowInvalidMovePopup(true);
      setTimeout(() => setShowInvalidMovePopup(false), 2000); // Hide popup after 2 seconds
      return null;
    }

    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if legal
  }

  // function makeRandomMove() {
  //   const possibleMoves = game.moves();
  //   if (game.isCheckmate() || game.isDraw() || possibleMoves.length === 0)
  //     return; // exit if the game is over

  //   const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  //   makeAMove(possibleMoves[randomIndex]); // using san (Standard Algebraic Notation) to make the move
  //   setIsWhiteNext(!isWhiteNext);
  // }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    if (move === null) {
      return false;
    }
    setIsWhiteNext(!isWhiteNext);
    return true;
  }



  //alpha beta pruning minimax

// Function to evaluate the board based on material balance
const evaluateBoard = (fen: string): number => {
  const game = new Chess(fen);

  const board = game.board();
  let evaluation = 0;

  // Assign values to pieces
  const pieceValues: Record<string, number> = {
    p: 10,  // Pawn
    n: 30,  // Knight
    b: 30,  // Bishop
    r: 50,  // Rook
    q: 90,  // Queen
    k: 900, // King
  };

  // Loop through the board and calculate the material balance
  board.forEach((row) => {
    row.forEach((piece) => {
      if (piece) {
        const value = piece.color === 'w' ? pieceValues[piece.type] : -pieceValues[piece.type];
        evaluation += value;
      }
    });
  });

  return evaluation;
};

  
  // Minimax function with alpha-beta pruning
const minimax = (depth: number, maximizingPlayer: boolean, alpha: number, beta: number, game: any) => {
  if (depth === 0 || checkGameOverInMinMax()) {
    return evaluateBoard(game.fen());
  }

  const possibleMoves = game.moves();
  possibleMoves.sort(() => 0.5 - Math.random()); // Randomize the moves to get different possible moves each time

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of possibleMoves) {
      game.move(move);
      const evalBoard = minimax(depth - 1, false, alpha, beta, game);
      game.undo();
      maxEval = Math.max(maxEval, evalBoard);
      alpha = Math.max(alpha, evalBoard);
      if (beta <= alpha) {
        break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of possibleMoves) {
      game.move(move);
      const evalBoard = minimax(depth - 1, true, alpha, beta, game);
      game.undo();
      minEval = Math.min(minEval, evalBoard);
      beta = Math.min(beta, evalBoard);
      if (beta <= alpha) {
        break;
      }
    }
    return minEval;
  }
};





// Function to make the best move using Minimax with alpha-beta pruning
const makeBestMove = (depth: number, game: any) => {
  let bestMove = null;
  let bestEval = -Infinity;

  const possibleMoves = game.moves();
  possibleMoves.sort(() => 0.5 - Math.random()); // Randomize the moves to get different possible moves each time

  for (const move of possibleMoves) {
    game.move(move);
    const evalBoard = minimax(depth - 1, false, -Infinity, Infinity, game);
    game.undo();

    if (evalBoard > bestEval) {
      bestEval = evalBoard;
      bestMove = move;
    }
  }

  makeAMove(bestMove); // Implement the makeAMove function as per your requirements
};

// Use this function to make the best move
function makeBestMoveWrapper() {
  const possibleMoves = game.moves();
  if (checkGameOver()|| possibleMoves.length === 0) return;

  makeBestMove(4, game); // You can adjust the depth according to your requirements
  setIsWhiteNext(!isWhiteNext);
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
