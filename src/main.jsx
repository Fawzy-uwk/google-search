import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ResultsContextProvider } from "./Contexts/ResultContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResultsContextProvider>
      <App />
    </ResultsContextProvider>
  </React.StrictMode>
);
