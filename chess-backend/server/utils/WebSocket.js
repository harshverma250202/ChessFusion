
// models
import GameModel from '../models/Game.js';

function connection(socket) {



    socket.on('create-game', async ({ name, game }) => {
        try {
            const newGame = await GameModel.createGame(name, game);
            
            // Join a room
            socket.join(newGame.whitePlayerId);
    
            // Emitting JSON to the client
            socket.emit('game-created', {
                success: true,
                message: 'Game successfully created',
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

        // Join the game room
        socket.join(game.BlackPlayerId);

        // Notify others in the room that a player has joined
        socket.to(gameId).emit('player-joined', {
            success: true,
            message: 'Player joined successfully',
            game
        });

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

    }

export default connection;
