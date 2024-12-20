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
                    return <div className="col-md-12 mb-3 article--item" key={p.id} onClick={() => {
                        navigate("/Posts/" + p.id)
                    }}>
                        <p className="author text-truncate mb-1">{p?.author}</p>
                        <h2 className="title truncate-2-lines">{p.title}</h2>
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