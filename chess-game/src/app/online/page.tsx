"use client";
import React, { use, useEffect } from "react";
import CreateOrJoinGame from "@/components/CreateGame";
import { Socket, io } from "socket.io-client";
import Online from "@/components/Board/OnlineBoard";
import { Chess } from "chess.js";
type Props = {};

interface AllGameDetails {
  game: string;
  _id: string;
  WhitePlayer: string;
  BlackPlayer: string;
  WhitePlayerId: string;
  BlackPlayerId: string;
  LastPlayed: string;

}


const Page = (props: Props) => {
  // let socket: Socket;
  let [socket, SetSocket] = React.useState<Socket | null>(null);
  let [whiteName, setWhiteName] = React.useState<string>("");
  let [blackName, setBlackName] = React.useState<string>("");
  let [gameStarted, SetGameStarted] = React.useState<boolean>(false);
  let [gameDetails, SetGameDetails] = React.useState<AllGameDetails | null>(null);
  let [gameId, SetGameId] = React.useState<string>("");
  let [bothPlayerJoined, SetBothPlayerJoined] = React.useState<boolean>(false);

  //move handling
  let [currentPlayerIsWhite, SetCurrentPlayerIsWhite] = React.useState<boolean>(true);
  
  

  const onCreateGame = (name: string) => {
    console.log(`Creating game as ${name}`);
    // Emit event to create game
    let newChess= new Chess();
    socket?.emit("create-game", { name, game: newChess.fen()}); // replace {} with actual game object if needed
    // Listen for the server's response
    socket?.once("game-created", (response) => {
      console.log(response);
      if (response.success) {
        console.log("Game started successfully");
        SetGameDetails(response.game);
        SetGameId(response.roomName);
        SetGameStarted(true);
      } else {
        console.error(`Game creation failed: ${response.message}`);
      }
    });
  };

  const onJoinGame = (name: string, gameId: string) => {
    console.log(`Joining game as ${name} with game ID ${gameId}`);
    // Emit event to join game
    socket?.emit("join-game", { gameId, name });
    SetCurrentPlayerIsWhite(false);
  };
  useEffect(() => {
    // Initialize Socket.io client
    SetSocket(io("ws://localhost:5000"));
    // Event listener for successful connection
    socket?.on("connect", () => {
      console.log("Connected to server");
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      console.log("Disconnecting from server");
      socket?.disconnect();
    };
  }, []);
  useEffect(() => {
    socket?.on("player-joined", (response) => {
      console.log("Received 'player-joined' event:", response);
      console.log("Player joined");
      if (response.success) {
        SetGameDetails(response.game);
        SetGameId(response.game._id);
        SetGameStarted(true);
        SetBothPlayerJoined(true);
        setWhiteName(response.game.WhitePlayer);
        setBlackName(response.game.BlackPlayer);
      } else {
        console.error(`Failed to join game: ${response.message}`);
        console.error("Error details:", response.error);
      }
    });
  }, [socket]);


  const [elapsedTime, setElapsedTime] = React.useState(0);

  useEffect(() => {
    if (!bothPlayerJoined) {
      const timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [bothPlayerJoined]);
  return (
    <div>
      {!gameStarted && (
        <CreateOrJoinGame onCreateGame={onCreateGame} onJoinGame={onJoinGame} />
      )}
      {gameStarted && !bothPlayerJoined && (
        <>
          {" "}
          <p>Game Started ... waiting to join </p>
          <p>Game Id: {gameId}</p>
        </>
      )}
      {bothPlayerJoined && (
        <>
          <p className="text-center mb-4">Game Id: {gameId}</p>
          <p>{currentPlayerIsWhite? <p className="text-center mb-4">your are white</p>:<p className="text-center mb-4">you are black</p>}</p>
          <div className="md:flex m-5 justify-center flex-col items-center">
            <h1 className="text-2xl mb-4">online game</h1>
            <div className="flex justify-between w-full mb-4">
              <div className="flex items-center">
                <i className="fas fa-chess-king mr-2"></i>
                <h2>{whiteName} (White)</h2>
              </div>
              <div className="flex items-center">
                <i className="fas fa-chess-king mr-2"></i>
                <h2>{blackName} (Black)</h2>
              </div>
            </div>
            <div className="text-center mb-4">
              <h2>Elapsed Time: {elapsedTime}s</h2>
            </div>
            <Online socket={socket} gameId={gameId} currentPlayerIsWhite={currentPlayerIsWhite}/>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
