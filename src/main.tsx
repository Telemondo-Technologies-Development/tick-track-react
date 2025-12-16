// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Splash page */}
          <Route path="/app" element={<App />} />   {/* Main timer/dashboard */}
        </Routes>
      </Router>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found.");
}
