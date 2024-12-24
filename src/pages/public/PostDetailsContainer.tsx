import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../config/hook";
import { getPublicPostsDetails } from "./ducks/operators";
import Editor from "../../components/Editor/Editor";
import { Descendant } from "slate";
import { format } from "date-fns";

const PostDetailsContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { postId } = useParams<{ postId: string }>();
    const { post } = useAppSelector((state) => state.publicPost);
    const [editorContent, setEditorContent] = useState<Descendant[]>([]);

    useEffect(() => {
        if (post) {
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
            {post && <p className="text-muted">{post?.user?.name} at {format(post?.updatedAt, "yyyy MM")}</p>}
            {post && editorContent.length > 0 && <Editor readonly initValue={editorContent} onSave={() => { }} />}
        </>
    )
}

export default PostDetailsContainer;