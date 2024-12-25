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
import React from "react";
import { ILoginForm, LoginForm } from "./LoginForm";
import axios from "axios";

const LoginContainer: React.FC = () => {
    const handleLogin = async (data: ILoginForm) => {
        try {
            await axios.post("/auth/login", data);
            window.location.href = "/";
        } catch (error) {
            console.log("Login Error", error);
        }
    }
    return (
        <div className="row form-container flex-center">
            <div className="col-md-6">
                <LoginForm onSubmit={(data) => {
                    handleLogin(data);
                }} />
            </div>
        </div>
    );
};

export default LoginContainer;