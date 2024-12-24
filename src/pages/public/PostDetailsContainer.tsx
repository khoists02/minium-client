import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../config/hook";
import { getPublicPostsDetails } from "./ducks/operators";
import Editor from "../../components/Editor";
import { Descendant } from "slate";

const PostDetailsContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { postId } = useParams<{ postId: string }>();
    const { post } = useAppSelector((state) => state.publicPost);

    const [editorContent, setEditorContent] = useState<Descendant[]>([]);
    const [title, setTitle] = useState("");


    useEffect(() => {
        if (post) {
            setTitle(post?.title);
            setEditorContent(JSON.parse(post?.content));
        }
    }, [post])

    useEffect(() => {
        if (postId) {
            dispatch(getPublicPostsDetails(postId));
        }
    }, [postId]);


    return (
        <>
            <h4>{title}</h4>
            <small className="text-muted">{post?.user?.name}</small>
            {editorContent.length > 0 && <Editor readonly initValue={editorContent} onSave={() => { }} />}
        </>
    )
}

export default PostDetailsContainer;