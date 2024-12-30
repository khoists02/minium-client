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
import React, { FC, useCallback, useState } from "react";
import { CreateChannelRequest } from "../../../types/channels";

const CreateNewChannel: FC = () => {
  const [model, setModel] = useState<CreateChannelRequest>({
    name: "",
    description: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModel({
      ...model,
      [name]: value,
    });
  };
  return (
    <>
      <div className="header mb-3">
        <h4>Create your channel.</h4>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <div className="label mb-2">Name</div>
            <input
              className="form-control"
              name="name"
              id="name"
              value={model.name}
              onChange={handleInputChange}
            ></input>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <div className="label mb-2">Description</div>
            <textarea
              className="form-control"
              name="description"
              rows={3}
              id="description"
              value={model.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="form-group col-md-6">
          <button className="btn btn-primary col-sm">Create</button>
        </div>
      </div>
    </>
  );
};

export default CreateNewChannel;
