import React from "react";
import { Header } from "./components/Header";
import { PublicRouter } from "./routes";

function App() {
  return (
    <>
    <Header />
    <div className="main"></div>
      <div className="container mt-5">
        <PublicRouter />
      </div>
    </>
  );
}

export default App;
