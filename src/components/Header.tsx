import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../config/hook";
import axios from "axios";
import { authClearState } from "../pages/admin/auth/ducks/slices";
import { Button, Dropdown, Nav } from "react-bootstrap";

export const Header: FC<{ showAdminRouter?: boolean }> = ({
    showAdminRouter,
}) => {
    const { account } = useAppSelector((state) => state.ath);
    const dispatch = useAppDispatch();

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
    return (
        <>
            <div className="navbar">
                <div className="navbar__left " >
                    <div className="container d-flex justify-content-between">
                        <a href="/" className="navbar-brand d-flex align-items-center text-dark">
                            Posts
                        </a>
                        {showAdminRouter && <>
                            <Nav className="ms-auto">
                                <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
                                    <Dropdown.Toggle
                                        as={Button}
                                        variant="light"
                                        className="d-flex align-items-center border-0"
                                        onClick={toggleDropdown}
                                    >
                                        <span>{account?.name}</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align="end">
                                        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                        <Dropdown.Item href="/WritePost">Write</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </>}
                    </div>
                </div>
            </div>
        </>
    )
}