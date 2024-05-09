import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css';
import { AuthContextProvider } from "./context/AuthContextProvider.jsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
      < AuthContextProvider >
        <RouterProvider router={router} />
      </ AuthContextProvider >
    //</React.StrictMode>
);