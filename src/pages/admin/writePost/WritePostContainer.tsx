import React, { FC } from "react";
import Editor from "../../../components/Editor";
import { Row } from "../../../components/Row";

const WritePostContainer: FC = () => {
    // const [editorContent, setEditorContent] = useState("");

    // const handleEditorChange = (content: string) => {
    //     setEditorContent(content); // Update the editor content state
    // };
    return (
        <div className="row">
            <div className="col-md-12">
                <Row />
                <Editor />
            </div>
        </div>
    )
}

export default WritePostContainer;
