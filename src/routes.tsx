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
import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PostContainer from "./pages/public/PostContainer";
import RegisterContainer from "./pages/admin/auth/RegisterContainer";
import LoginContainer from "./pages/admin/auth/LoginContainer";
import PostDetailsContainer from "./pages/public/PostDetailsContainer";
import WritePostContainer from "./pages/admin/writePost/WritePostContainer";
import MyPostContainer from "./pages/admin/writePost/MyPostContainer";
import MyPostDetailsContainer from "./pages/admin/writePost/MyPostDetailsContainer";
import Profile from "./pages/admin/auth/Profile";

const AppRouter: FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Posts" />}></Route>
      <Route path="/Posts" element={<PostContainer />}></Route>
      <Route path="/Posts/:postId" element={<PostDetailsContainer />}></Route>
      <Route path="/Register" element={<RegisterContainer />}></Route>
      {!isAuthenticated && (
        <Route path="/Login" element={<LoginContainer />}></Route>
      )}
      <Route path="*" element={<span>Not Found</span>}></Route>
      {isAuthenticated && (
        <>
          <Route path="/WritePost" element={<WritePostContainer />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/MyPost" element={<MyPostContainer />}></Route>
          <Route
            path="/MyPost/:postId/Edit"
            element={<MyPostDetailsContainer />}
          ></Route>
        </>
      )}
    </Routes>
  );
};

export { AppRouter };
