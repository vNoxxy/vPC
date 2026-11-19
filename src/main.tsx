import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./fonts";
import "./index.css";
import { router } from "./App";

// With JavaScript, what is revealed on scroll starts hidden; without it, everything simply shows.
document.documentElement.classList.add("js");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
