# ChessFusion

ChessFusion is a comprehensive chess application that offers multiple game modes, including online multiplayer, local 1v1, and playing against a computer opponent. Built with Next.js for the frontend and Express.js for the backend, this project provides a seamless and interactive chess-playing experience.

## Features

- Online multiplayer chess games
- Local 1v1 gameplay
- Play against a computer opponent
- Real-time game updates using WebSocket
- Responsive design for desktop and mobile devices

## Project Structure

The project is divided into two main parts:

1. Frontend (chess-game)
2. Backend (chess-backend)

### Frontend (chess-game)

The frontend is built using Next.js and React. It includes the following main components:

- Home page with game mode selection
- Online multiplayer game board
- Local 1v1 game board
- Computer opponent game board

### Backend (chess-backend)

The backend is built using Express.js and provides the following functionalities:

- WebSocket server for real-time game updates
- Game state management
- Computer opponent move generation

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ChessFusion.git
   cd ChessFusion
   ```

2. Install dependencies for both frontend and backend:
   ```
   cd chess-game
   npm install
   cd ../chess-backend
   npm install
   ```

3. Start the backend server:
   ```
   cd chess-backend
   npm start
   ```

4. In a new terminal, start the frontend development server:
   ```
   cd chess-game
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

1. On the home page, select your desired game mode (Online, Computer, or 1v1).
2. For online games, create a new game or join an existing one using the game ID.
3. For computer games, enter your name and start playing against the AI.
4. For 1v1 games, enter both players' names and enjoy a local multiplayer experience.

## Technologies Used

- Frontend:
  - Next.js
  - React
  - TypeScript
  - Tailwind CSS
  - Socket.io-client

- Backend:
  - Express.js
  - Socket.io
  - MongoDB (for game state persistence)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any queries or suggestions, please contact:
harshverma250202@gmail.com
