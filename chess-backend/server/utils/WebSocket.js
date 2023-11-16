
// models
import GameModel from '../models/Game.js';

function connection(socket) {
    const MAX_ROOM_SIZE = 2;
    function getAvailableRooms() {
        const adapter = io.of('/').adapter;
        const rooms = adapter.rooms;
        console.log("getAvailableRooms room", rooms);
        return rooms;
    }


    socket.on('create-game', async ({ name, game }) => {
        try {
            const newGame = await GameModel.createGame(name, game);
            // Join a room
            let roomName = newGame._id.toString();
            socket.join(roomName);
            console.log("all rooms", getAvailableRooms());
            // Emitting JSON to the client
            socket.emit('game-created', {
                success: true,
                message: 'Game successfully created',
                roomName: roomName,
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
    // Inside the 'join-game' event handler
    socket.on('join-game', async ({ gameId, name }) => {
        try {
            const game = await GameModel.joinGame(gameId, name);
            console.log("Game Found while joining", game);
            const roomName = game._id.toString();
            const rooms = getAvailableRooms();
            console.log("room", rooms);
            const room = rooms.get(roomName);
            console.log("room", room);

            if (room && room.size < MAX_ROOM_SIZE) {
                socket.join(roomName);
                console.log(`Player joined room: ${roomName}`);
                io.to(roomName).emit('player-joined', {
                    success: true,
                    message: 'Player joined successfully',
                    roomName: roomName,
                    game
                });
            } else {
                socket.emit('roomFull');
                console.log(`Room ${roomName} is full`);
            }
        } catch (error) {
            console.log(error);

            // Emit an error message to the client
            io.to(roomName).emit('player-joined', {
                success: false,
                message: 'Failed to join game',
                error: error.message
            });
        }
    });

    // When a player makes a move
    socket.on('make-move', async ({ gameId, game,played }) => {
        try {
            const updatedGame = await GameModel.updateGameById(gameId, game);

            // Notify both players about the move
            io.to(gameId).emit('move-made', {
                success: true,
                message: 'Move successful',
                game: game,
                lastPlayed: played,
            });

        } catch (error) {
            console.log(error);
            
            // Emit an error message to both players
            io.to(gameId).emit('move-made', {
                success: false,
                message: 'Move failed',
                error: error.message
            });

        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');

        // Remove the disconnected player from the room

    });

}

export default connection;
