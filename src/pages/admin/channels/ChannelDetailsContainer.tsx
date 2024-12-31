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
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../config/hook";
import { getAllPostsOfChannel, getChannelsDetails } from "./ducks/operators";
import { Avatar } from "../../../components/Avatar";
import { CountBlock } from "../../public/CountBlock";
import { format } from "date-fns";

const ChannelDetailsContainer: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { channel, posts } = useAppSelector((state) => state.channels);
  const { account } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getChannelsDetails(id));
      dispatch(getAllPostsOfChannel(id));
    }
  }, [id]);

  const handleWritePostInChannel = () => {
    navigate(`/Channels/WritePost/${id}`);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="channel-details">
            <div className="channel-banner">
              <div className="channel-hero"></div>

              <div className="channel-logo">
                <Avatar
                  size="sm"
                  className="me-3"
                  allowTrigger={false}
                  url={""}
                />
                <p>
                  {channel?.name}{" "}
                  <i
                    onClick={handleWritePostInChannel}
                    className="fa fa-pencil-square-o cursor-pointer ms-2"
                  ></i>
                </p>
                <p>{channel?.description}</p>
              </div>
            </div>

            <div className="channel-tabs"></div>

            <div className="channel-posts mt-3">
              {posts.map((p) => {
                return (
                  <div className="mb-3 mt-3 article--item" key={p.id}>
                    <span className="d-flex align-items-center mb-2">
                      <Avatar
                        shortName={p.user?.name}
                        size="xs"
                        url={p.user?.photoUrl}
                        description={p.user?.description}
                      />
                      <span className="username text-muted">
                        {p.user?.name}
                      </span>
                    </span>
                    <h2
                      onClick={() => {
                        navigate(`/Channels/${id}/Posts/${p.id}`);
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
        {/* <div className="col-md-4 col-xs-12 pl-2 pr-2 channel-info">
          <div className="channel-logo">
            <Avatar
              description={channel?.description}
              size="sm"
              className="me-3"
              allowTrigger={false}
              url={""}
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ChannelDetailsContainer;
