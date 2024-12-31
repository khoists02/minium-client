/*
 * Mimium Pty. Ltd. ("LKG") CONFIDENTIAL
 * Copyright (c) 2022 Mimium project Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of LKG. The intellectual and technical concepts contained
 * herein are proprietary to LKG and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from LKG.  Access to the source code contained herein is hereby forbidden to anyone except current LKG employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 */
import React, { useEffect, useMemo } from "react";
import { Header } from "./components/Header";
import { AppRouter } from "./routes";
import { useAppDispatch, useAppSelector } from "./config/hook";
import { getAuthenticatedUser } from "./pages/admin/auth/ducks/operators";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, sessionHasBeenFetched } = useAppSelector(
    (state) => state.auth,
  );

  const showAdminRouter = useMemo(() => {
    return sessionHasBeenFetched && isAuthenticated;
  }, [isAuthenticated, sessionHasBeenFetched]);

  useEffect(() => {
    dispatch(getAuthenticatedUser());
  }, []);

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
