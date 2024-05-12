import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Notes from "./pages/Notes.jsx";
import Home from "./pages/Home.jsx";
import Nav from "./Nav.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./index.css";

// HashRouter
const router = createHashRouter([
  {
    // Root
    path: "/",
    element: <Home />,
  },
  {
    //Home
    path: "/home",
    element: <Home />,
  },
  {
    // Notes
    path: "/notes",
    element: <Notes />,
  },
  {
    // Catch routing errors
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Nav />
    <RouterProvider router={router} />
  </>
);
