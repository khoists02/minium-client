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
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../config/hook";
import { getPublicPostsDetails } from "./ducks/operators";
import Editor from "../../components/Editor/Editor";
import { Descendant } from "slate";
import { CountBlock } from "./CountBlock";
import { Avatar } from "../../components/Avatar";
import axios from "axios";
import { ICommentResponse } from "../../types/general";
import { Comments } from "../../components/Comments";

const PostDetailsContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams<{ postId: string }>();
  const commentRef = useRef<HTMLDivElement>(null);
  const { post } = useAppSelector((state) => state.publicPost);
  const { account } = useAppSelector((state) => state.auth);
  const [editorContent, setEditorContent] = useState<Descendant[]>([]);
  const [comments, setComments] = useState<ICommentResponse[]>([]);

  useEffect(() => {
    if (post) {
      setEditorContent(JSON.parse(post?.content));
    }
  }, [post]);

  const getAllComments = async () => {
    try {
      const rs = await axios.get(`/posts/${postId}/comments`, {
        params: {
          limit: 10000,
        },
      });
      setComments(rs.data?.content);
    } catch (error) {}
  };

  useEffect(() => {
    if (postId) {
      getAllComments();
      dispatch(getPublicPostsDetails(postId));
    }
  }, [postId]);

  const reload = () => {
    dispatch(getPublicPostsDetails(postId));
  };

  const showEditor = useMemo(
    () => post && editorContent.length > 0,
    [post, editorContent],
  );

  const getSortAuthor = (name: string) => {
    if (!name) return "A";
    const splitObject = name.split(" ");

    let letter = splitObject[0][0].toUpperCase();

    if (splitObject.length > 1) {
      letter = `${letter}${splitObject[1][0].toUpperCase()}`;
    }
    return letter;
  };

  /**
   * Handle submit comment in row for editor
   * @param title
   * @param content
   */

  const scrollToComment = () => {
    commentRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const handleSubmitComment = async (title: string, content: string) => {
    try {
      await axios.post(`/posts/${postId}/comments`, {
        title,
        content,
      });
      setTimeout(() => {
        getAllComments();
        scrollToComment();
      }, 1000);
    } catch (error) {
      console.log("Post comment error", error);
    }
  };

  return (
    <div className="post-container">
      <div className="post-content">
        <Avatar
          description={account?.description}
          size="xs"
          placement="right"
          url={account?.photoUrl ? account?.photoUrl : ""}
          className="me-2 mb-4"
        />
        <div className="border-top border-bottom mb-5 pt-2 pb-2 d-flex flex-center-between">
          <CountBlock
            scrollToComment={scrollToComment}
            reload={reload}
            account={account}
            post={post}
          />
          <div className="right"></div>
        </div>
        {showEditor && (
          <Editor
            readonly
            author={account}
            initValue={editorContent}
            onSave={() => {}}
            onCommentSubmit={handleSubmitComment}
          />
        )}
        <div className="mt-5"></div>

        <Comments
          ref={commentRef}
          postId={postId}
          fetching={getAllComments}
          author={account}
          comments={comments}
        />
      </div>
    </div>
  );
};

export default PostDetailsContainer;
