import React, { FC } from "react";
import Editor from "../../../components/Editor/Editor";
import { Row } from "../../../components/Row";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const initValue = [
    {
        id: uuidv4(),
        type: "title",
        placeholder: "Title...",
        children: [{
            text: "Your Title",
        }]
    },
    {
        id: uuidv4(),
        type: "paragraph",
        placeholder: "Tell your story...",
        children: [{
            text: "",
        }]
    },

]

const WritePostContainer: FC = () => {

    const handleSavePost = async (content: any) => {
        if (!content || content.length === 0) return;
        let title = uuidv4();
        const titleArr = content?.filter((x) => x.type === "title" || x.type === "paragraph");
        if (titleArr?.length > 0) {
            title = titleArr[0]?.children[0]?.text;
        }
        // FIlter content.
        const final = content.filter((x) => x.type !== "image" && x.children[0]?.text !== "");
        try {
            await axios.post("/posts", {
                title: title,
                content: JSON.stringify(final)
            })
        } catch (error) {
            console.log("Save post error !!!", error);
        }
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <Row />
                <Editor initValue={initValue as any} onSave={(value) => {
                    handleSavePost(value)
                }} />
            </div>
        </div>
    )
}

export default WritePostContainer;
