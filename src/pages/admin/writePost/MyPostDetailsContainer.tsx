import React, { FC, useEffect, useState } from "react";
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
    const titleArr = content?.filter((x) => x.type === "title" || x.type === "paragraph");
    if (titleArr?.length > 0) {
      title = titleArr[0]?.children[0]?.text;
    }
    // FIlter content.
    const final = content.filter((x) => x.type === "image" || x.type === "break" || (x.type !== "image" && x.children[0]?.text !== ""));
    try {
      await axios.put(`/posts/${post.id}`, {
        title: post.title,
        content: JSON.stringify(final)
      })
    } catch (error) {
      console.log("Updated post error !!!", error);
    }
  }


  return (
    <>
      {post && editorContent.length > 0 && <Editor initValue={editorContent} onSave={(ct) => {
        handleSavePost(ct)
      }} />}
    </>
  )
}

export default MyPostDetailsContainer;