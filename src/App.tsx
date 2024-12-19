import React, { useMemo } from "react";
import { Header } from "./components/Header";
import { AdminRouter, PublicRouter } from "./routes";
import { useAppSelector } from "./config/hook";

function App() {
  const { isAuthenticated, sessionHasBeenFetched } = useAppSelector((state) => state.ath);

  const showAdminRouter = useMemo(() => {
    return sessionHasBeenFetched && isAuthenticated;
  }, [isAuthenticated, sessionHasBeenFetched]);

  return (
    <>
      <Header />
      <div className="main"></div>
      <div className="container mt-5">
        <PublicRouter />
        {showAdminRouter && <AdminRouter />}
      </div>
    </>
  );
}

export default App;
