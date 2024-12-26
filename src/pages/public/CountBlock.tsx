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
import React, { FC, useCallback, useEffect, useState } from "react"
import { IPostResponse, IUserResponse } from "../../types/general"
import axios from "axios";

export const CountBlock: FC<{
  post?: IPostResponse;
  account?: IUserResponse;
  reload?: () => void;
}> = ({
  post,
  account,
  reload,
}) => {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const checkVisibleLike = async () => {
      if (!post?.id || !account?.id) return;

      try {
        setLoading(true);
        const rs = await axios.get(`/posts/${post?.id}/users/${account?.id}/visible`);
        setVisible(rs.data?.visible);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    const handleLikeOrUnlike = useCallback(async () => {
      if (loading) return; // prevent if API still loading.
      try {
        if (!visible) {
          // Like
          await axios.post(`/posts/${post?.id}/users/${account?.id}/like`);
          if (reload) reload();
          checkVisibleLike();
        } else {
          // Unlike
          await axios.delete(`/posts/${post?.id}/users/${account?.id}/unlike`);
          if (reload) reload();
          checkVisibleLike();
        }
      } catch (error) {
        console.log("Count Error", error);
      }

    }, [visible, loading]);

    useEffect(() => {
      checkVisibleLike();
    }, [account, post]);


    return (
      <>
        <div className="block-count">
          <span className="text-muted mr-4 cursor-pointer">
            <i className={`fa fa-heart-o  ${visible ? "text-danger" : ""}`} onClick={handleLikeOrUnlike} ></i>
            {post?.countLikes > 0 && <span className="ml-1">{post?.countLikes}</span>}
          </span>
          <span className="text-muted cursor-pointer">
            <i className="fa fa-comment-o"></i>
            {post?.countComments > 0 && <span className="ml-1">{post?.countComments}</span>}
          </span>
        </div>
      </>
    )
  }