import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/keybinding-vscode";
import "ace-builds/src-noconflict/ext-searchbox";
import { useState } from "react";
import { usePostBody } from "../../../utils/Body";

export default function TextArea() {
    const [annotations, setAnnotations] = useState([]);
    let postBody = usePostBody();

    return (
        <>
            <AceEditor
                placeholder="Type code."
                mode="json"
                theme="dracula"
                fontSize={14}
                width="100%"
                height="calc(100% - 100px)"
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                wrapEnabled={true}
                onChange={(value, event) => {
                    const { row, column } = event.start;
                    try {
                        let result = JSON.parse(value);
                        setAnnotations([]);
                        let setObject = postBody.setObject;
                        setObject({ setObject, ...result });
                    } catch (error) {
                        setAnnotations((prev) => {
                            let o = {
                                row,
                                column,
                                type: "error",
                                text: `Invalid JSON syntax at row: ${row} column:${column}`,
                            };
                            let now = prev.filter((item) => item.row !== o.row);
                            return [...now, o];
                        });
                    }
                }}
                annotations={annotations}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    useWorker: true,
                    tabSize: 4,
                }}
                keyboardHandler="vscode"
                defaultValue={`{
    "hello": "world",
    "bool": true
}`}
            />
        </>
    );
}
