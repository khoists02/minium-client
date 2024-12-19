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
                    return <div className="col-md-4 mb-3" key={p.id} onClick={() => {
                        navigate("/Posts/" + p.id)
                    }}>
                        <div className="card post-card">
                            <div className="card-header mb-0 pb-1">
                                <h4 className="title text-truncate">{p.title}</h4>
                            </div>

                            <div className="card-body">
                                <p className="truncate-3-lines">{p.content}</p>
                            </div>

                            <div className="card-footer bg-white">
                                <p className="mb-0">
                                    <span>Author: </span>
                                    <span>{p.author} </span>
                                    <span>at {format(new Date(p.updatedAt), "dd/MM/yyyy HH:mm")}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}

export default PostContainer;