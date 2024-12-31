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
import { CardForm } from "../../../components/Cards/CardForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNewChannel: FC = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async () => {
    try {
      await axios.post("/channels", model);
      navigate("/Channels");
    } catch (error) {}
  };

  return (
    <>
      <CardForm
        classNames={{ wrapperClassName: "" }}
        labels={{ title: "Create new channel" }}
      >
        <div className="form-group">
          <div className="form-label mb-2">Name</div>
          <input
            className="form-control"
            name="name"
            id="name"
            value={model.name}
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="form-group">
          <div className="form-label mb-2">Description</div>
          <textarea
            className="form-control"
            name="description"
            rows={3}
            id="description"
            value={model.description}
            onChange={handleInputChange}
          />
        </div>

        <button className="btn btn-submit" onClick={handleSubmit}>
          Create
        </button>
      </CardForm>
    </>
  );
};

export default CreateNewChannel;
