import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import PostContainer from "./pages/public/PostContainer";
import RegisterContainer from "./pages/admin/auth/RegisterContainer";
import LoginContainer from "./pages/admin/auth/LoginContainer";

const PublicRouter: FC = () => {
    return <Routes>
        <Route path="/" element={<PostContainer />}></Route>
        <Route path="/Register" element={<RegisterContainer />}></Route>
        <Route path="/Login" element={<LoginContainer />}></Route>
        <Route path="*" element={<span>Not Found</span>}></Route>
    </Routes>
}

const AdminRouter: FC = () => {
    return <Routes>
        <Route path="/Admin/Users" element={<span />}></Route>
        {/* <Route path="*" element={<span>Not Found</span>}></Route> */}
    </Routes>
}

export { PublicRouter, AdminRouter };