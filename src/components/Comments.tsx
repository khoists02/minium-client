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
import React, { FC, forwardRef, useMemo, useState } from "react";
import { ICommentResponse, IUserResponse } from "../types/general";
import { Avatar } from "./Avatar";
import axios from "axios";

interface CommentsProps {
  author: IUserResponse;
  comments: ICommentResponse[];
  fetching: () => void;
  postId: string;
}

export const Comments = forwardRef<HTMLDivElement, CommentsProps>(
  ({ author, comments, fetching, postId }, ref) => {
    const [focused, setFocused] = useState(false);
    const deleteComment = async (commentId: string) => {
      try {
        await axios.delete(`/posts/${postId}/comments/${commentId}`);
        fetching();
      } catch (error) {}
    };

    const accountPhotoUrl = useMemo(() => {
      if (!author) return "";
      return author?.photoUrl;
    }, [author]);

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
            {focused && (
              <Avatar
                size="xs"
                shortName={author?.name}
                url={accountPhotoUrl}
                description={author?.description}
              />
            )}
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
                  className="btn btn-light me-2"
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
                  <Avatar
                    placement="right"
                    description={cmt?.author?.description}
                    shortName={cmt?.author?.name}
                    size="xxs"
                    url={cmt?.author?.photoUrl}
                    className="me-2 mb-3"
                  />
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
