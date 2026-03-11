import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import "./styles/dashboard-theme.css";
import { AuthProvider } from "./modules/auth/providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
// async function testConnection() {
//   const { data, error } = await supabase.from("users").select("*").limit(1);

//   console.log("Supabase Test:", data, error);
// }

// testConnection();
