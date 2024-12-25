import React, { FC, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../config/hook";
import axios from "axios";
import { authClearState } from "../pages/admin/auth/ducks/slices";
import { Button, Dropdown, Nav } from "react-bootstrap";
import { useLocation } from "react-router";

export const Header: FC<{ showAdminRouter?: boolean }> = ({
    showAdminRouter,
}) => {
    const { account } = useAppSelector((state) => state.auth);
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

    }, [account])

    return (
        <>
            <div className="navbar">
                <div className="navbar__left " >
                    <div className="container d-flex justify-content-between">
                        <a href="/" className="navbar-brand d-flex align-items-center text-dark">
                            Minium
                        </a>
                        {showAdminRouter && <div className="d-flex align-items-center">
                            {showPublishPost && <span onClick={() => publishPost()} className="text-success cursor-pointer">Publish</span>}
                            <Nav className="ms-auto">
                                <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                                    <Dropdown.Toggle
                                        as={Button}
                                        variant="light"
                                        className="btn-outline "
                                        onClick={toggleDropdown}
                                    >
                                        <div className="circle-acc">{getSortAccountName}</div>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align="end">
                                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                        <Dropdown.Item href="/WritePost">Write</Dropdown.Item>
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