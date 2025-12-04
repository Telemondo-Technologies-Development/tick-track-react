Offline Tick-Track Application

This is a single-page time tracking application built with React and optimized for offline use. It utilizes IndexedDB via the Dexie.js library for persistent, client-side data storage, ensuring users can track tasks even without an internet connection.

Key Features

Offline First: All tracking data is stored locally in the browser's IndexedDB.

Persistent Storage: Data is saved using Dexie.js and persists across browser sessions.

Real-time UI: Uses dexie-react-hooks (useLiveQuery) for instant updates to the history list upon saving or deleting a ticket.

Modular Architecture: Code is separated into components, hooks, and utilities for maintainability (DRY Principle).

Ticket Management: Users can name a ticket, start/stop a timer, and choose to save or cancel the recorded session.

Safety Confirmation: Includes a custom confirmation dialog for permanent ticket deletion.

Tech Stack

Framework: React

Build Tool: Vite (Client-side rendering)

Database: IndexedDB (accessed via Dexie.js)

Styling: Tailwind CSS

Setup and Installation

Follow these steps to get the application running on your local machine.

Prerequisites

You must have Node.js and npm (or yarn/pnpm) installed.

1. Clone the Repository

git clone [YOUR_REPOSITORY_URL]
cd tick-track-react


2. Install Dependencies

The project uses react, dexie, and dexie-react-hooks.

npm install


3. Create Necessary Files

Ensure your required modular files are created:

mkdir src/db
mkdir src/hooks
mkdir src/utils

# Create files in the terminal
touch src/db/appDB.js
touch src/hooks/useTimer.js
touch src/utils/timeUtils.js


(Note: Paste the corresponding code for the application logic into these files.)

4. Run the Application

Start the Vite development server:

npm run dev


The application will open in your browser, typically at http://localhost:5173/.

📂 Project Structure

The codebase adheres to the principle of "Separate file per function/code" to ensure a clean, maintainable structure:

tick-track-react/
├── node_modules/
├── index.html           # Main entry point (loads React and Tailwind CDN)
├── package.json         # Lists all dependencies (React, Dexie, Vite)
├── src/
│   ├── db/
│   │   └── appDB.js     # Dexie setup: Defines the IndexedDB schema.
│   ├── hooks/
│   │   └── useTimer.js  # Timer Logic: Contains all state management, effects, and handlers (e.g., start/stop/save).
│   ├── utils/
│   │   └── timeUtils.js # Utilities: Contains pure helper functions (e.g., formatDuration).
│   ├── App.jsx          # Presentational Component: Calls hooks and renders the entire UI/Layout.
│   └── main.jsx         # React Entry: Initializes the React application.
└── ...
