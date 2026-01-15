import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/app" element={<App />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found.");
}