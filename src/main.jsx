import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Notes from "./pages/Notes.jsx";
import Home from "./pages/Home.jsx";
import Nav from "./Nav.jsx";
import Create from "./pages/Create.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./index.css";
import "./App.css";

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
    //Create notes
    path: "/create",
    element: <Create />,
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
