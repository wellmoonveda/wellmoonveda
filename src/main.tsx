import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import "./styles/dashboard-theme.css";
import { AuthProvider } from "./modules/auth/providers/AuthProvider";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="bottom-right" />
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
