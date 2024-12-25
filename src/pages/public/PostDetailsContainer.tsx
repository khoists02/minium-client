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
import { useAppDispatch, useAppSelector } from "../../config/hook";
import { getPublicPostsDetails } from "./ducks/operators";
import Editor from "../../components/Editor/Editor";
import { Descendant } from "slate";
import { format } from "date-fns";
import { CountBlock } from "./CountBlock";

const PostDetailsContainer: FC = () => {
    const dispatch = useAppDispatch();
    const { postId } = useParams<{ postId: string }>();
    const { post } = useAppSelector((state) => state.publicPost);
    const { account } = useAppSelector((state) => state.auth);
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

    const reload = () => {
        dispatch(getPublicPostsDetails(postId));
    }

    const showEditor = useMemo(() => post && editorContent.length > 0, [post, editorContent]);


    return (
        <>
            {post && <p ><span className="text-muted">Published in</span> Coding Beauty by <span className="text-muted">{post?.user?.name}</span> at <span className="text-muted">{format(post?.updatedAt, "MMM, dd yyyy")}</span></p>}
            <div className="border-top border-bottom mb-5 pt-2 pb-2 d-flex flex-center-between">
                <CountBlock reload={reload} account={account} post={post} />
                <div className="right">
                    <i className="fa fa-share"></i>
                </div>
            </div>
            {showEditor && <Editor readonly initValue={editorContent} onSave={() => { }} />}
            <div className="mt-5"></div>
        </>
    )
}

export default PostDetailsContainer;