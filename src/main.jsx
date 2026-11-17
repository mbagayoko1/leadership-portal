import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// After a new version is published, a tab that was opened earlier may ask for
// a code file the new version no longer has. Reload once to get the current
// version instead of showing a broken screen; the flag stops a reload loop.
window.addEventListener("vite:preloadError", event => {
  try {
    if (sessionStorage.getItem("ldp_reloaded_for_update")) return;
    sessionStorage.setItem("ldp_reloaded_for_update", "1");
  } catch (e) { return; }
  event.preventDefault();
  window.location.reload();
});
window.addEventListener("load", () => {
  setTimeout(() => { try { sessionStorage.removeItem("ldp_reloaded_for_update"); } catch (e) {} }, 10000);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
