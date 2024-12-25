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
            {post && <p ><span className="text-muted">Published in</span> Coding Beauty by <span className="text-muted">{format(post?.updatedAt, "MMM, dd yyyy")}</span></p>}
            <div className="border-top border-bottom mb-5 pt-2 pb-2 d-flex flex-center-between">
                <div className="left">
                    <span className="text-muted mr-4 cursor-pointer"><i className="fa fa-heart-o "></i> <span>3</span></span>
                    <span className="text-muted cursor-pointer"><i className="fa fa-comment-o"></i> <span >3</span></span>
                </div>

                <div className="right">
                    <i className="fa fa-share"></i>
                </div>

            </div>
            {post && editorContent.length > 0 && <Editor readonly initValue={editorContent} onSave={() => { }} />}
            <div className="mt-5"></div>
        </>
    )
}

export default PostDetailsContainer;