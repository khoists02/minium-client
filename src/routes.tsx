import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PostContainer from "./pages/public/PostContainer";
import RegisterContainer from "./pages/admin/auth/RegisterContainer";
import LoginContainer from "./pages/admin/auth/LoginContainer";
import PostDetailsContainer from "./pages/public/PostDetailsContainer";
import WritePostContainer from "./pages/admin/writePost/WritePostContainer";
import MyPostContainer from "./pages/admin/writePost/MyPostContainer";
import MyPostDetailsContainer from "./pages/admin/writePost/MyPostDetailsContainer";

const AppRouter: FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
    return <Routes>
        <Route path="/" element={<Navigate to="/Posts" />}></Route>
        <Route path="/Posts" element={<PostContainer />}></Route>
        <Route path="/Posts/:postId" element={<PostDetailsContainer />}></Route>
        <Route path="/Register" element={<RegisterContainer />}></Route>
        <Route path="/Login" element={<LoginContainer />}></Route>
        <Route path="*" element={<span>Not Found</span>}></Route>
        {isAuthenticated && <>
            <Route path="/WritePost" element={<WritePostContainer />}></Route>
            <Route path="/MyPost" element={<MyPostContainer />}></Route>
            <Route path="/MyPost/:postId/Edit" element={<MyPostDetailsContainer />}></Route>
        </>}
    </Routes>
}

export { AppRouter };