import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import setupAxiosInterceptors from "./config/axios-interceptor";
import axios from "axios";
import { Provider } from 'react-redux';
import { store } from './config/store';
import "./style.scss";

setupAxiosInterceptors(store);

axios.defaults.baseURL = "http://localhost:8080/api";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>

  </StrictMode>,
);
