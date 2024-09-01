#!/bin/bash

# Function to start the Next.js frontend
start_frontend() {
    echo "Starting Next.js frontend..."
    osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"'/chess-game && npm run dev"'
}

# Function to start the Express backend
start_backend() {
    echo "Starting Express backend..."
    osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"'/chess-backend && npm start"'
}

# Start both projects
start_frontend
start_backend

echo "Both projects are now running in separate terminal windows."
echo "Frontend should be available at http://localhost:3000"
echo "Backend should be available at http://localhost:5020"
echo "Close the terminal windows to stop the servers."