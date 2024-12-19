import React from "react";
import { ILoginForm, LoginForm } from "./LoginForm";
import axios from "axios";
import { useNavigate } from "react-router";

const LoginContainer: React.FC = () => {
    const navigate = useNavigate();
    const handleLogin = async (data: ILoginForm) => {
        try {
            await axios.post("/auth/login", data);
            window.location.href = "/";
        } catch (error) {
            console.log("Login Error", error);
        }
    }
    return (
        <div className="container mt-5">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <LoginForm onSubmit={(data) => {
                            handleLogin(data);
                        }} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LoginContainer;