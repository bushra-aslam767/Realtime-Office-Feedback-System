import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.module.css"; // global resets live here if you want

const root = createRoot(document.getElementById("root"));
root.render(<App />);
