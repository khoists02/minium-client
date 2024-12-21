import React, { useEffect, useMemo } from "react";
import { Header } from "./components/Header";
import { AppRouter } from "./routes";
import { useAppDispatch, useAppSelector } from "./config/hook";
import { getAuthenticatedUser } from "./pages/admin/auth/ducks/operators";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, sessionHasBeenFetched } = useAppSelector((state) => state.ath);

  const showAdminRouter = useMemo(() => {
    return sessionHasBeenFetched && isAuthenticated;
  }, [isAuthenticated, sessionHasBeenFetched]);

  useEffect(() => {
    dispatch(getAuthenticatedUser());
  }, [])

  return (
    <>
      <Header showAdminRouter={showAdminRouter} />
      <div className="main"></div>
      <div className="container mt-4  ">
        <AppRouter isAuthenticated={showAdminRouter} />
      </div>
    </>
  );
}

export default App;
