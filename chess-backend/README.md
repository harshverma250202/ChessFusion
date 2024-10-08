# Chess Game Backend

This is the backend server for the ChessFusion project, a comprehensive chess application that supports online multiplayer gameplay.

## Features

- RESTful API for game state management
- WebSocket integration for real-time updates using Socket.io
- MongoDB integration for storing game data
- Game logic validation and move processing
- Room-based multiplayer system

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/chess-backend.git
   cd chess-backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=5020
   MONGODB_URI=mongodb://localhost:27017/chessdb
   ```

## Project Structure

- `server/index.js`: Entry point of the application
- `server/config/`: Configuration files for MongoDB and other settings
- `server/models/`: MongoDB schema definitions
- `server/utils/`: Utility functions, including WebSocket handling

## Running the Server

To run the server in development mode with hot-reloading:

```
npm start
```

For production:

```
npm run start:server
```

The server will be available at `http://localhost:5020`.

## WebSocket Events

The backend uses Socket.io for real-time communication. Here are the main events:

- `create-game`: Creates a new game and room
- `join-game`: Allows a player to join an existing game
- `make-move`: Processes a player's move and updates the game state
- `disconnect`: Handles player disconnection

## Database Schema

The `Game` model includes the following fields:
- `WhitePlayer`: Name of the player with white pieces
- `BlackPlayer`: Name of the player with black pieces
- `WhitePlayerId`: Unique ID for the white player
- `BlackPlayerId`: Unique ID for the black player
- `game`: Current state of the game (chess position)
- `LastPlayed`: Indicates which color moved last ('white' or 'black')

## API Endpoints

The server uses Express.js for routing. Currently, there's a catch-all route that

## Contributing

Contributions to the Chess Game Backend are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a pull request

## License

This project is licensed under the ISC License.

## Contact

For any queries or suggestions, please open an issue in the GitHub repository
