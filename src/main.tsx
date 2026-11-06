import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./fonts";
import "./index.css";
import { router } from "./App";
import { installScrollReveal } from "./lib/motion";

installScrollReveal();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
