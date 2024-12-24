import React, { FC } from "react";
import Editor from "../../../components/Editor";
import { Row } from "../../../components/Row";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const WritePostContainer: FC = () => {

    const handleSavePost = async (content: any) => {
        try {
            await axios.post("/posts", {
                title: "Here’s a detailed guide to handling the onChange event in a Slate editor.",
                content: JSON.stringify(content)
            })
        } catch (error) {
            console.log("Save post error !!!");
        }
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <Row />
                <Editor initValue={[
                    {
                        id: uuidv4(),
                        type: "title",
                        placeholder: "Title...",
                        children: [{
                            text: "",
                        }]
                    },
                    {
                        id: uuidv4(),
                        type: "paragraph",
                        placeholder: "Tell your story...",
                        children: [{
                            text: "",
                        }]
                    }
                ]} onSave={(value) => {
                    handleSavePost(value)
                }} />
            </div>
        </div>
    )
}

export default WritePostContainer;
