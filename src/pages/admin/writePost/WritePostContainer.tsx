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
import React, { FC } from "react";
import Editor from "../../../components/Editor/Editor";
import { Row } from "../../../components/Row";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "../../../config/hook";
import { useParams } from "react-router";

const initValue = [
  {
    id: uuidv4(),
    type: "title",
    placeholder: "Title...",
    children: [
      {
        text: "",
      },
    ],
  },
  {
    id: uuidv4(),
    type: "paragraph",
    placeholder: "Tell your story...",
    children: [
      {
        text: "",
      },
    ],
  },
];

const WritePostContainer: FC = () => {
  const { account } = useAppSelector((state) => state.auth);
  const { id: channelId } = useParams();

  const handleSavePost = async (content: any) => {
    if (!content || content.length === 0) return;
    let title = uuidv4();
    const titleArr = content?.filter(
      (x) => x.type === "title" || x.type === "paragraph",
    );
    if (titleArr?.length > 0) {
      title = titleArr[0]?.children[0]?.text;
    }
    // FIlter content.
    const final = content.filter(
      (x) =>
        x.type === "image" ||
        x.type === "break" ||
        (x.type !== "image" && x.children[0]?.text !== ""),
    );
    try {
      await axios.post("/posts", {
        title: title,
        content: JSON.stringify(final),
        channelId,
      });
    } catch (error) {
      console.log("Save post error !!!", error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12 pt-5">
        <Editor
          initValue={initValue as any}
          author={account}
          onSave={(value) => {
            handleSavePost(value);
          }}
        />
      </div>
    </div>
  );
};

export default WritePostContainer;
