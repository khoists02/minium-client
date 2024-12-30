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
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../config/hook";
import { Avatar } from "../../../components/Avatar";
import axios from "axios";
import { CardForm } from "../../../components/Cards/CardForm";

const Profile: FC = () => {
  const { account } = useAppSelector((state) => state.auth);
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const getSortAccountName = useMemo(() => {
    if (!account?.name) return "A";
    const splitObject = account.name.split(" ");

    let letter = splitObject[0][0].toUpperCase();

    if (splitObject.length > 1) {
      letter = `${letter}${splitObject[1][0].toUpperCase()}`;
    }
    return letter;
  }, [account]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const uploadFile = event.target.files?.[0];
    if (uploadFile) setFile(uploadFile);
  };

  const blobUrl = useMemo(() => {
    if (!file) return "";

    return URL.createObjectURL(file);
  }, [file]);

  const handleUpdateProfile = async () => {
    try {
      if (file) {
        const fd = new FormData();
        fd.append("profileImage", file);

        await axios.post("/authenticatedUser/profile", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      if (description)
        await axios.put("/authenticatedUser/description", { description });
    } catch (error) {
      console.log("Handle upload error !!!", error);
    }
  };

  const showSortImage = useMemo(() => {
    return !account.photoUrl && !blobUrl;
  }, [account, blobUrl]);

  const showLogo = useMemo(() => {
    return account.photoUrl && !blobUrl;
  }, [account, blobUrl]);

  useEffect(() => {
    setDescription(account?.description);
  }, [account]);

  return (
    <>
      <CardForm
        classNames={{ wrapperClassName: "" }}
        labels={{ title: "Update Profile" }}
      >
        <div className="row">
          <div className="col-md-12">
            <div className="item">
              <div className="text-muted">Photo</div>
              <div className="mt-2 d-flex">
                {showSortImage && (
                  <button className="btn-profile size-sm mr-3">
                    {getSortAccountName}
                  </button>
                )}
                {blobUrl && <Avatar size="sm" className="mr-3" url={blobUrl} />}
                {showLogo && (
                  <Avatar size="sm" className="mr-3" url={account.photoUrl} />
                )}
                <div className="">
                  <div>
                    <span
                      className="cursor-pointer"
                      onClick={() => inputRef?.current.click()}
                    >
                      Upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="image-upload"
                      onChange={handleFileUpload}
                      ref={inputRef}
                    />
                    <span className="text-danger ml-2 cursor-pointer">
                      Remove
                    </span>
                  </div>
                  <small className="text-muted">
                    Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels
                    per side.
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="item form-group col-md-8 col-xs-12">
            <label htmlFor="name" className="form-label">
              Name*
            </label>
            <input
              disabled
              type="text"
              value={account.name}
              className="form-control"
              id="name"
              name="name"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="item form-group col-md-8 col-xs-12">
            <label htmlFor="name" className="form-label">
              Email*
            </label>
            <input
              disabled
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={account.email}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="item form-group col-md-8 col-xs-12">
            <label htmlFor="name" className="text-muted">
              Description
            </label>
            <textarea
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
              id="description"
              name="description"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 col-xs-12 mt-3">
            <button onClick={handleUpdateProfile} className="btn btn-submit">
              Update
            </button>
          </div>
        </div>
      </CardForm>
    </>
  );
};

export default Profile;
