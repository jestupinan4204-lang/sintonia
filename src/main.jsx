import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/global.css";

createRoot (document.querySelector ("#root")).render (
    <React.StrictMode>
        <App />
    </React.StrictMode>
)