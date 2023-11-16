"use client"
import React, { useState, useEffect, useRef } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Socket, io } from "socket.io-client";

export default function OnineBoard( {socket,gameId,currentPlayerIsWhite}: { socket:Socket|null,gameId:string,currentPlayerIsWhite:boolean} ) {
 
  const [game, setGame] = useState<Chess>(new Chess());
  // const [isWhiteNext, setIsWhiteNext] = useState<boolean>(true);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [showInvalidMovePopup, setShowInvalidMovePopup] = useState<boolean>(false);
  const [showGameOverPopup, setShowGameOverPopup] = useState<boolean>(false);
  const [notYourMovePopup, setNotYourMovePopup] = useState<boolean>(false);
  const [currentPlayingMove, setCurrentPlayingMove] = useState<boolean>(true);

  useEffect(()=>{
    setCurrentPlayingMove(currentPlayerIsWhite);
  },[currentPlayerIsWhite]);
  

  
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
    console.log("cpm",currentPlayingMove);
    if(currentPlayingMove===false){
      setNotYourMovePopup(true);
      setTimeout(() => setNotYourMovePopup(false), 500); // Show the invalid move popup for 2 seconds
      return null;
    }
    
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

    if(result!==null){
      console.log("emitting make move ",gameCopy.fen());
      socket?.emit("make-move", { gameId: gameId, game: gameCopy.fen(),played:currentPlayerIsWhite?"white":"black" });    
      // setCurrentPlayingMove(!currentPlayerIsWhite);
    }
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
    // setIsWhiteNext(!isWhiteNext);
    return true;
  }



  useEffect(() => {
    socket?.on("move-made", (response) => {
      console.log("Received 'move-made' event:", response);
      if (response.success) {
        setGame(new Chess(response.game));
        
        if(response.lastPlayed=="white"){
          if(currentPlayerIsWhite)
            setCurrentPlayingMove(false);
          else
            setCurrentPlayingMove(true);
        }else{
          if(currentPlayerIsWhite)
            setCurrentPlayingMove(true);
          else
            setCurrentPlayingMove(false);
        }

      } else {
        console.error(`Move failed: ${response.message}`);
      }
    });
  },[]);

  const boardSize = "80vh"; // Set the desired board size here

  return (
    <div style={{ width: boardSize }}>
      {showInvalidMovePopup && <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-red-500 text-white p-5 rounded-lg">
          Invalid Move
        </div>
      </div>}
      {
        notYourMovePopup && <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-red-500 text-white p-5 rounded-lg">
          Not Your Move
        </div>
      </div>
      }
      {showGameOverPopup && <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-green-500 text-white p-5 rounded-lg">
          Game Over
        </div>
      </div>}
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        boardOrientation={currentPlayerIsWhite ? "white" : "black"}
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
