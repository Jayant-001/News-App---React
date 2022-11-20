import React from "react";
import ReactDOM from "react-dom";
import * as ReactDOMClient from 'react-dom/client';
import App from "./App";
import "./index.css";

const root = ReactDOMClient.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// ReactDOM.render(
//       <App />,
//     document.getElementById("root")
// );

