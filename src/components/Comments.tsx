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
import React, { FC, forwardRef, useState } from "react";
import { ICommentResponse, IUserResponse } from "../types/general";
import { Avatar } from "./Avatar";
import axios from "axios";
import { MiniumUserResponse } from "@minium/common";

interface CommentsProps {
  author: IUserResponse;
  comments: ICommentResponse[];
  fetching: () => void;
  postId: string;
}

export const Comments = forwardRef<HTMLDivElement, CommentsProps>(
  ({ author, comments, fetching, postId }, ref) => {
    const [focused, setFocused] = useState(false);
    const getRandomColor = (): string => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const getSortAuthor = (name: string) => {
      if (!name) return "A";
      const splitObject = name.split(" ");

      let letter = splitObject[0][0].toUpperCase();

      if (splitObject.length > 1) {
        letter = `${letter}${splitObject[1][0].toUpperCase()}`;
      }
      return letter;
    };

    const sortAuthor = (user: any) => {
      return !user?.photoUrl ? (
        <span
          className="author btn-profile size-xs mr-1"
          style={{ background: getRandomColor() }}
        >
          {getSortAuthor(user?.name)}
        </span>
      ) : (
        <Avatar
          description={user.description}
          size="xxs"
          url={user.photoUrl}
          className="mr-2 mb-3"
        />
      );
    };

    const deleteComment = async (commentId: string) => {
      try {
        await axios.delete(`/posts/${postId}/comments/${commentId}`);
        fetching();
      } catch (error) {}
    };

    return (
      <div className="comments mb-5" ref={ref}>
        <div className="comments-box mb-5">
          <h4 className="mb-3">
            Responses{" "}
            {comments?.length > 0 ? (
              <span>({comments.length})</span>
            ) : (
              <span></span>
            )}
          </h4>

          <div
            className="comments__area"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            {focused && <span>{sortAuthor(author)}</span>}
            <textarea
              placeholder="Typing..."
              className="form-control"
              rows={focused ? 3 : 1}
              name=""
              id=""
            ></textarea>
            <div className={`d-flex buttons ${!focused ? "mt-0" : ""}`}>
              {focused && (
                <button
                  className="btn btn-light mr-2"
                  onClick={() => setFocused(false)}
                >
                  Cancel
                </button>
              )}
              <button className="btn btn-success">Response</button>
            </div>
          </div>
        </div>

        <div className="comments-list">
          {comments.map((cmt) => {
            return (
              <div className="comments__item pb-2">
                <div className="mb2">
                  <span>
                    {sortAuthor({
                      ...cmt?.author,
                      photoUrl: `${axios.defaults.baseURL.replace("/api", "")}${cmt?.author?.photoUrl}`,
                    })}
                  </span>
                  <span>{cmt?.author?.name}</span>
                </div>
                {cmt.title && <p className="title">{cmt.title}</p>}
                <p className="content mb-0">{cmt.content}</p>
                {author?.id === cmt?.author?.id && (
                  <small
                    onClick={() => deleteComment(cmt.id)}
                    className="text-danger pb-2 cursor-pointer"
                  >
                    Delete
                  </small>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
