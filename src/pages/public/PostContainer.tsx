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
import React, { FC, useEffect } from "react";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../config/hook";
import { getPublicPosts } from "./ducks/operators";
import { useNavigate } from "react-router";

const PostContainer: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { entities } = useAppSelector((state) => state.publicPost);

    useEffect(() => {
        dispatch(getPublicPosts());
    }, []);

    return (
        <>
            <div className="row">
                {entities?.map((p) => {
                    return <div className="col-md-12 mb-3 article--item" key={p.id} >
                        <p className="author text-truncate mb-1">{p?.author}</p>
                        <h2 onClick={() => {
                            navigate("/Posts/" + p.id)
                        }} className="title cursor-pointer truncate-2-lines">{p.title}</h2>
                        <p className="description truncate-3-lines">{p.description}</p>
                        <p className="mb-0 footer">
                            <span>{format(new Date(p.updatedAt), "MMM yyyy")}</span>
                        </p>
                        <p className="break"></p>
                    </div>
                })}
            </div>
        </>
    )
}

export default PostContainer;