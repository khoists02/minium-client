import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import Editor from "../../components/Editor";
import { useAppDispatch, useAppSelector } from "../../config/hook";
import { getPublicPostsDetails } from "./ducks/operators";
import ToggleSwitch from "../../components/ToggleSwitch";
import Comments from "../../components/Comments";

const PostDetailsContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { postId } = useParams<{ postId: string }>();
    const { post } = useAppSelector((state) => state.publicPost);
    const [preview, setPreview] = useState(true);

    const [editorContent, setEditorContent] = useState<string>("");
    const [title, setTitle] = useState("");

    const handleEditorChange = (content: string) => {
        setEditorContent(content); // Update the editor content state
    };

    useEffect(() => {
        if (post) {
            setTitle(post?.title);
            setEditorContent(post?.content);
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
            <div className="mt-2">
                <ToggleSwitch initialState={preview} onChange={(e) => setPreview(e)} />
            </div>
            {preview && (
                <div className="preview" dangerouslySetInnerHTML={{ __html: editorContent }}>

                </div>
            )}
            {!preview && <Editor value={editorContent} onChange={handleEditorChange} />}

            <Comments />
        </>
    )
}

export default PostDetailsContainer;