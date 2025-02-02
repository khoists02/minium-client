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
import { Avatar } from "./Avatar";

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
      console.log(error);
    }
  };

  const showPublishPost = useMemo(() => {
    return pathname.includes("/MyPost/");
  }, [pathname]);

  const publishPost = async () => {
    try {
      await axios.put(`/posts/${localStorage.getItem("postId")}/publish`);
    } catch (error) {}
  };

  const getSortAccountName = useMemo(() => {
    if (!account?.name) return "A";
    const splitObject = account.name.split(" ");

    let letter = splitObject[0][0].toUpperCase();

    if (splitObject.length > 1) {
      letter = `${letter}${splitObject[1][0].toUpperCase()}`;
    }
    return letter;
  }, [account]);

  const showWritePost = useMemo(() => pathname !== "/WritePost", [pathname]);
  return (
    <>
      <div className="navbar">
        <div className="navbar__left ">
          <div className="container d-flex justify-content-between">
            <a
              href="/"
              className="navbar-brand d-flex align-items-center text-dark nav-logo"
            >
              Minium
            </a>
            {showAdminRouter && (
              <div className="d-flex align-items-center">
                {showWritePost && (
                  <i
                    onClick={() => navigate("/WritePost")}
                    className="fa fa-pencil-square-o header-write me-3"
                    aria-hidden="true"
                  ></i>
                )}
                {showPublishPost && (
                  <span
                    onClick={() => publishPost()}
                    className="btn-publish cursor-pointer me-3"
                  >
                    Publish
                  </span>
                )}
                <Nav className="ms-auto">
                  <Dropdown
                    show={dropdownOpen}
                    placement="bottom"
                    onToggle={toggleDropdown}
                  >
                    <Dropdown.Toggle
                      as={Button}
                      variant="light"
                      className={
                        account?.photoUrl
                          ? "btn-profile-outline"
                          : "btn-profile "
                      }
                      onClick={toggleDropdown}
                    >
                      {account?.photoUrl ? (
                        <Avatar
                          allowTrigger={false}
                          onClick={toggleDropdown}
                          size="xs"
                          className=""
                          url={account?.photoUrl}
                        />
                      ) : (
                        <span>{getSortAccountName}</span>
                      )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item className="py-1 mb-1" href="/Profile">
                        <span className="text-muted w-100">
                          <i className="fa fa-user me-2"></i>
                          <span>Profile</span>
                        </span>
                      </Dropdown.Item>

                      <Dropdown.Item className="py-1 mb-1" href="/MyPost">
                        <span className="text-muted">
                          <i className="fa fa-file-text-o me-2"></i>
                          <span>My Posts</span>
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Item className="py-1" href="/Channels">
                        <span className="text-muted">
                          <i className="fa fa-dashboard me-2"></i>
                          <span>My Channels</span>
                        </span>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>
                        <span className="text-muted">
                          <i className="fa fa-sign-out me-2"></i>
                          <span>Sign Out</span>
                        </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
