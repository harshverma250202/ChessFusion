"use client"
import React,{useEffect} from 'react'
import CreateOrJoinGame from '@/components/CreateGame'
import { Socket,io } from 'socket.io-client'
import Online from '@/components/Board/OnlineBoard'
import { Chess } from "chess.js";
type Props = {}

const Page = (props: Props) => {

  // let socket: Socket;

  let [socket,SetSocket] = React.useState<Socket | null>(null);
  let [gameStarted,SetGameStarted] = React.useState<boolean>(false);
  let [gameDetails,SetGameDetails] = React.useState<Chess>(new Chess());
  let [gameId,SetGameId] = React.useState<string>('');

  const onCreateGame = (name: string) => {
    console.log(`Creating game as ${name}`);
    // Emit event to create game
    socket?.emit('create-game', { name, game:  gameDetails.fen()}); // replace {} with actual game object if needed
    // Listen for the server's response
    socket?.once('game-created', (response) => {
      console.log(response);
  
      if (response.success) {
        
        let chessGame:Chess = new Chess(response.game.game);
        SetGameDetails(chessGame);
        SetGameId(response.roomName);
        SetGameStarted(true);
      } else {
        console.error(`Game creation failed: ${response.message}`);
      }
    });
  }
  
  const onJoinGame = (name: string, gameId: string) => {
    console.log(`Joining game as ${name} with game ID ${gameId}`);
  
    // Emit event to join game
    socket?.emit('join-game', { gameId, name });

    // Listen for the server's response
    socket?.once('player-joined', (response) => {
      console.log(response);
  
      if (response.success) {
        SetGameDetails(response.game.game);
        SetGameId(response.game._id);
        SetGameStarted(true);
      } else {
        console.error(`Failed to join game: ${response.message}`);
      }
    });
  }
  
  useEffect(() => {
    // Initialize Socket.io client
    SetSocket(io('ws://localhost:5000'));
    // Event listener for successful connection
    socket?.on('connect', () => {
      console.log('Connected to server');
    });

    // Cleanup function to disconnect the socket when the component unmounts
    return () => {
      console.log('Disconnecting from server');
      socket?.disconnect();
    };
  }, []);


  return (
    <div>
     { !gameStarted && <CreateOrJoinGame onCreateGame={onCreateGame} onJoinGame={onJoinGame} />}

     {gameStarted &&
     <>
      <p>Game Id: {gameId}</p>

     <Online mainGame={gameDetails} boardOrientationProp='white' />
     </>}
    </div>
  )
}

export default Page