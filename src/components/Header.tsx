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
import React, { FC, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../config/hook";
import axios from "axios";
import { authClearState } from "../pages/admin/auth/ducks/slices";
import { Button, Dropdown, Nav } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";

export const Header: FC<{ showAdminRouter?: boolean }> = ({
    showAdminRouter,
}) => {
    const { account } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.delete("auth/logout");
            // clear state.
            dispatch(authClearState());

            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    const showPublishPost = useMemo(() => {
        return pathname.includes("/MyPost/");
    }, [pathname]);

    const publishPost = async () => {
        try {
            await axios.put(`/posts/${localStorage.getItem("postId")}/publish`);
        } catch (error) {

        }
    }

    const getSortAccountName = useMemo(() => {
        if (!account?.name) return "A";
        const splitObject = account.name.split(" ");

        let letter = splitObject[0][0].toUpperCase();

        if (splitObject.length > 1) {
            letter = `${letter}${splitObject[1][0].toUpperCase()}`
        }
        return letter;

    }, [account]);


    const showWritePost = useMemo(() => pathname !== "/WritePost", [pathname]);
    return (
        <>
            <div className="navbar">
                <div className="navbar__left " >
                    <div className="container d-flex justify-content-between">
                        <a href="/" className="navbar-brand d-flex align-items-center text-dark nav-logo">
                            Minium
                        </a>
                        {showAdminRouter && <div className="d-flex align-items-center">
                            {showWritePost && <i onClick={() => navigate("/WritePost")} className="fa fa-pencil-square-o header-write mr-3" aria-hidden="true"></i>}
                            {showPublishPost && <i onClick={() => publishPost()} className="fa fa-upload header-write cursor-pointer mr-3"></i>}
                            <Nav className="ms-auto">
                                <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                                    <Dropdown.Toggle
                                        as={Button}
                                        variant="light"
                                        className="btn-profile "
                                        onClick={toggleDropdown}
                                    >
                                        <span>{getSortAccountName}</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align="end">
                                        <Dropdown.Item href="/Profile">Profile</Dropdown.Item>

                                        <Dropdown.Item href="/MyPost">My Posts</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}