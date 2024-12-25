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
import React, { useState, FC } from "react";

export interface ILoginForm {
    email?: string;
    password?: string;
}

export const LoginForm: FC<{ onSubmit: (data: ILoginForm) => void }> = ({
    onSubmit,
}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Dispatching.
        onSubmit({
            email: formData?.email,
            password: formData?.password,
        })
    };

    return (

        <div className="card">
            <div className="card-body">
                <div className="app-brand pt-3 pb-3 flex-center">
                    <h4>Minium</h4>
                </div>
                <div className="app-description">
                    <h5>Welcome to Minium  👋</h5>
                    <p className="text-muted">Please sign-in to your account and start the adventure</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <small className="mb-2">Email</small>
                        <input
                            type="email"
                            className="form-control"
                            placeholder=""
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <small className="mb-2">Password</small>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group remember-me">
                        <span><input type="checkbox" name="" id="" /> <span className="font-weight ml-1">Remember me</span></span>
                    </div>
                    <button type="submit" disabled={!formData.password} className="btn btn-primary btn-block btn-login mt-4">
                        Login
                    </button>
                </form>
            </div>
        </div>

    );
};
