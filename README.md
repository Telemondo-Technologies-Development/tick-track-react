# Offline Tick-Track Application

This is a single-page time tracking application built with React and optimized for offline use. It utilizes IndexedDB via the Dexie.js library for persistent, client-side data storage, ensuring users can track tasks even without an internet connection.

## Key Features

* Offline First: All tracking data is stored locally in the browser's IndexedDB.

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

1. Clone the Repository

```
https://github.com/Telemondo-Technologies-Development/tick-track-react.git

```


2. Install Dependencies

The project uses react, dexie, and dexie-react-hooks.

```
npm install

```

```
npm install react react-dom dexie dexie-react-hooks

```


3. Create Necessary Files

Ensure your required modular files are created:

mkdir src/db
mkdir src/hooks
mkdir src/utils

# Create files in the terminal
src/db/appDB.js
src/hooks/useTimer.js
src/utils/timeUtils.js



4. Run the Application

Start the Vite development server:

```
npm run dev

```




