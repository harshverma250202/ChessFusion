
// models
import GameModel from '../models/Game.js';

function connection(socket) {
    const MAX_ROOM_SIZE = 2;
    const rooms = {};



    socket.on('create-game', async ({ name, game }) => {
        try {
            const newGame = await GameModel.createGame(name, game);
            // Join a room
            socket.join(newGame._id);
            rooms[roomName] = [socket.id];
            // Emitting JSON to the client
            socket.emit('game-created', {
                success: true,
                message: 'Game successfully created',
                roomName: newGame._id,
                game: newGame
            });
        } catch (error) {
            console.log(error);
            // Emitting an error as JSON
            socket.emit('game-created', {
                success: false,
                message: 'Game creation failed',
                error: error.message
            });
        }
    });



    // When a player tries to join a game
    socket.on('join-game', async ({ gameId, name }) => {
        try {
            const game = await GameModel.joinGame(gameId, name);
            console.log("Game Found while joining", game);
            const roomName = game._id;
            const room = rooms[roomName];
            // Join the game room
            if (room && room.length < MAX_ROOM_SIZE) {
                socket.join(roomName);
                room.push(socket.id);
                console.log(`Player joined room: ${roomName}`);
                socket.to(roomName).emit('player-joined', {
                    success: true,
                    message: 'Player joined successfully',
                    roomName: roomName,
                    game
                });
              } else {
                socket.emit('roomFull');
              }
            // Notify others in the room that a player has joined
            

        } catch (error) {
            console.log(error);

            // Emit an error message to the client
            socket.emit('player-joined', {
                success: false,
                message: 'Failed to join game',
                error: error.message
            });
        }
    });

    // When a player makes a move
    socket.on('move', async ({ gameId, game }) => {
        try {
            const updatedGame = await GameModel.updateGameById(gameId, game);

            // Notify both players about the move
            socket.to(updatedGame.WhitePlayerId).emit('move', {
                success: true,
                message: 'Move successful',
                game: updatedGame
            });
            socket.to(updatedGame.BlackPlayerId).emit('move', {
                success: true,
                message: 'Move successful',
                game: updatedGame
            });

        } catch (error) {
            console.log(error);

            // Emit an error message to both players
            socket.to(updatedGame.WhitePlayerId).emit('move', {
                success: false,
                message: 'Move failed',
                error: error.message
            });
            socket.to(updatedGame.BlackPlayerId).emit('move', {
                success: false,
                message: 'Move failed',
                error: error.message
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    
        // Remove the disconnected player from the room
        Object.keys(rooms).forEach((roomName) => {
          const index = rooms[roomName].indexOf(socket.id);
          if (index !== -1) {
            rooms[roomName].splice(index, 1);
            if (rooms[roomName].length === 0) {
              delete rooms[roomName];
            }
            io.to(roomName).emit('playerLeft');
          }
        });
      });

}

export default connection;
