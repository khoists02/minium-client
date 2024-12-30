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
import React, { FC, useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../config/hook";
import { useNavigate } from "react-router";
import { getChannels } from "./ducks/operators";

const ChannelsController: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { channels } = useAppSelector((state) => state.channels);

  const handleCreateChannel = useCallback(() => {
    navigate("/Channels/Create");
  }, []);

  const handleNavigateDetails = useCallback((id: string) => {
    navigate(`/Channels/${id}`);
  }, []);

  useEffect(() => {
    dispatch(getChannels());
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {channels.length === 0 && (
            <>
              <div className="no-rs">You don't have channel</div>
              <button
                onClick={handleCreateChannel}
                className="btn btn-primary mt-2"
              >
                Create new
              </button>
            </>
          )}

          {channels.length > 0 && (
            <>
              <div className="channels-list">
                {channels.map((c) => {
                  return (
                    <div key={c.id} className="channel--item">
                      <h2
                        onClick={() => handleNavigateDetails(c.id)}
                        className="title cursor-pointer truncate-2-lines"
                      >
                        {c.name}
                      </h2>
                      <p className="description truncate-3-lines">
                        {c.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChannelsController;
