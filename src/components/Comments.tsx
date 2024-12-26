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
import React, { FC, useState } from "react";
import { ICommentResponse, IUserResponse } from "../types/general";
import { Avatar } from "./Avatar";
import axios from "axios";

interface CommentsProps {
  author: IUserResponse;
  comments: ICommentResponse[];
}

export const Comments: FC<CommentsProps> = ({
  author,
  comments,
}) => {
  const [focused, setFocused] = useState(false);
  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const getSortAuthor = (name: string) => {
    if (!name) return "A";
    const splitObject = name.split(" ");

    let letter = splitObject[0][0].toUpperCase();

    if (splitObject.length > 1) {
      letter = `${letter}${splitObject[1][0].toUpperCase()}`
    }
    return letter;
  }

  const sortAuthor = (user: any) => {
    return !user?.photoUrl ? <span className="author btn-profile size-xs mr-1" style={{ background: getRandomColor() }}>
      {getSortAuthor(user?.name)}
    </span> : (
      <Avatar description={user.description} size="xxs" url={user.photoUrl} className="mr-2 mb-3" />
    )
  }
  return <div className="comments mb-5">
    <div className="comments-box mb-5">
      <h3 className="mb-3">Responses ({comments?.length > 0 ? (comments.length) : ""})</h3>

      <div className="comments__area" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
        {focused && <span>{sortAuthor(author)}</span>}
        <textarea placeholder="Typing..." className="form-control" rows={focused ? 3 : 1} name="" id=""></textarea>
        <div className={`d-flex buttons ${!focused ? "mt-0" : ""}`}>
          {focused && <button className="btn btn-light mr-2" onClick={() => setFocused(false)}>Cancel</button>}
          <button className="btn btn-success">Response</button>
        </div>
      </div>
    </div>

    <div className="comments-list">
      {comments.map((cmt) => {
        return <div className="comments__item">
          <div className="mb2">
            <span>{sortAuthor({
              ...cmt?.author,
              photoUrl: `${axios.defaults.baseURL.replace("/api", "")}${cmt?.author?.photoUrl}`
            })}</span>
            <span>{cmt?.author?.name}</span>
          </div>
          {cmt.title && <p className="title">{cmt.title}</p>}
          <p className="content">{cmt.content}</p>
        </div>
      })}
    </div>
  </div>
}