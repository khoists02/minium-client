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
import { useParams } from "react-router";
import { getChannel } from "./ducks/slices";
import { useAppDispatch, useAppSelector } from "../../../config/hook";
import { getChannelsDetails } from "./ducks/operators";
import { Avatar } from "../../../components/Avatar";

const ChannelDetailsContainer: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { channel } = useAppSelector((state) => state.channels);

  useEffect(() => {
    if (id) dispatch(getChannelsDetails(id));
  }, [id]);

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="channel-details">
            <div className="channel-banner">
              <div className="channel-hero"></div>

              <div className="channel-logo"></div>
            </div>

            <div className="channel-tabs"></div>

            <div className="channel-posts"></div>
          </div>
        </div>
        <div className="col-md-4 pl-2 pr-2">
          <div className="channel-logo">
            <Avatar
              description={channel?.description}
              size="sm"
              className="mr-3"
              allowTrigger={false}
              url={""}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelDetailsContainer;
