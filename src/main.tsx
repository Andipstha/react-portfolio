import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const suppressedWarnings = [
  "THREE.Clock: This module has been deprecated",
  "THREE.WebGLShadowMap: PCFSoftShadowMap has been deprecated",
];

const originalWarn = console.warn.bind(console);
console.warn = (...args: unknown[]) => {
  const message = typeof args[0] === "string" ? args[0] : "";
  if (suppressedWarnings.some((warning) => message.includes(warning))) {
    return;
  }
  originalWarn(...args);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);