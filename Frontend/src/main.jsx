import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import Login from "./components/Login/Login.jsx";
import { Provider } from "react-redux";
import store from "./app/Store/store.js";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);
