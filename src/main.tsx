import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import setupAxiosInterceptors from "./config/axios-interceptor";
import axios from "axios";
import "./style.scss";

setupAxiosInterceptors();

axios.defaults.baseURL = "http://localhost:8080/api"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
