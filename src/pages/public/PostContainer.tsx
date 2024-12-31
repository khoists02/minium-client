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
import React, { FC, useEffect } from "react";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../config/hook";
import { getChannelsDropdown, getPublicPosts } from "./ducks/operators";
import { useNavigate } from "react-router";
import { Avatar } from "../../components/Avatar";
import { CountBlock } from "./CountBlock";

const PostContainer: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { entities } = useAppSelector((state) => state.publicPost);
  const { account } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getPublicPosts());
  }, []);

  useEffect(() => {
    if (account) dispatch(getChannelsDropdown(account.id));
  }, [account]);

  return (
    <>
      <div className="row">
        <div className="col-md-8 tabs"></div>
      </div>
      <div className="row">
        <div className="col-md-8 col-sm-12 col-xs-12">
          <div className="row">
            {entities?.map((p) => {
              return (
                <div className="col-md-12 mb-3 article--item" key={p.id}>
                  <span className="d-flex align-items-center mb-2">
                    <Avatar
                      description={p.user?.description}
                      size="xxs"
                      url={p.user?.photoUrl}
                      className="me-2"
                    />
                    <span className="username text-muted">{p.user?.name}</span>
                  </span>
                  <h2
                    onClick={() => {
                      navigate("/Posts/" + p.id);
                    }}
                    className="title cursor-pointer truncate-2-lines"
                  >
                    {p.title}
                  </h2>
                  <p className="description truncate-3-lines">
                    {p.description}
                  </p>
                  <p className="mb-0 footer">
                    <span>
                      {format(new Date(p.updatedAt), "MMM, dd yyyy HH:mm")}
                    </span>

                    <CountBlock
                      inline
                      wrapperClass="ms-2"
                      disabled
                      post={p}
                      account={account}
                      scrollToComment={() => {}}
                    />
                  </p>
                  <p className="break"></p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostContainer;
