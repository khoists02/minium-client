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
import React, { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { Descendant } from "slate";
import { getPublicPostsDetails } from "../../public/ducks/operators";
import { useAppDispatch, useAppSelector } from "../../../config/hook";
import Editor from "../../../components/Editor/Editor";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { CustomElement } from "../../../types/slate";

const MyPostDetailsContainer: FC = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams<{ postId: string }>();
  const { post } = useAppSelector((state) => state.publicPost);
  const [editorContent, setEditorContent] = useState<Descendant[]>([]);

  useEffect(() => {
    if (post) {
      const beforeRender: CustomElement[] = JSON.parse(post?.content);
      setEditorContent(beforeRender)

    }
  }, [post])

  useEffect(() => {
    if (postId) {
      dispatch(getPublicPostsDetails(postId));
      localStorage.setItem("postId", postId);
    }
  }, [postId]);

  const handleSavePost = async (content: any) => {
    if (!content || content.length === 0) return;
    let title = uuidv4();
    let description = "";
    const titleArr = content?.filter((x) => x.type === "title" || x.type === "paragraph");
    const descriptionArr = content?.filter((x) => x.type === "description");
    if (titleArr?.length > 0) {
      title = titleArr[0]?.children[0]?.text;
    }

    if (descriptionArr?.length > 0) {
      description = descriptionArr[0]?.children[0]?.text;
    }
    // FIlter content.
    const final = content.filter((x) => x.type === "image" || x.type === "break" || (x.type !== "image" && x.children[0]?.text !== ""));
    try {
      await axios.put(`/posts/${post.id}`, {
        title: post.title,
        content: JSON.stringify(final),
        description: description,
      })
    } catch (error) {
      console.log("Updated post error !!!", error);
    }
  }

  const showEditor = useMemo(() => post && editorContent.length > 0, [post, editorContent]);

  return (
    <div className="pb-5">
      {showEditor && <Editor
        author={{
          ...post?.user,
          photoUrl: `${axios.defaults.baseURL.replace("/api", "")}${post?.user?.photoUrl}`
        }}
        initValue={editorContent}
        onSave={(ct) => {
          handleSavePost(ct)
        }}
      />}
    </div>
  )
}

export default MyPostDetailsContainer;