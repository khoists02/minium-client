import React, { FC } from "react";

interface IRow {
    isTitle?: boolean;
    content?: string;
}

export const Row: FC<IRow> = ({
    isTitle,
    content,
}) => {
    return <>
        {/* <textarea className="form-control" /> */}
    </>
}