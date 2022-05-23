import { useState } from "react";
import { usePostBody } from "../../../utils/Body";
import dynamic from "next/dynamic";
import { useTheme } from "../../../utils/Theme";

const AceEditor = dynamic(
    async () => {
        let ace = await import("react-ace");
        require("ace-builds/src-noconflict/mode-json");
        require("ace-builds/src-noconflict/theme-dracula");
        require("ace-builds/src-noconflict/theme-xcode");
        require("ace-builds/src-noconflict/ext-searchbox");
        require("ace-builds/src-noconflict/keybinding-vscode");
        return ace;
    },
    {
        ssr: false,
        loading: () => <div>Loading editor...</div>,
    }
);

export default function BodySlide() {
    const { value: theme } = useTheme();
    const [annotations, setAnnotations] = useState([]);
    let postBody = usePostBody();
    return (
        <div className="slide Body">
            <h2>Json Content</h2>
            <AceEditor
                placeholder="Type code."
                mode="json"
                theme={theme === "dark" ? "dracula" : "xcode"}
                fontSize={14}
                width="100%"
                height="calc(100% - 100px)"
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                wrapEnabled={true}
                onLoad={(editor) => {
                    let result = JSON.parse(editor.getValue());
                    let setObject = postBody.setObject;
                    setObject({ setObject, ...result });
                }}
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
                                text: `Invalid JSON syntax at row: ${
                                    row + 1
                                } column:${column + 1}`,
                            };
                            let now = prev.filter((item) => item.row !== o.row);
                            return [...now, o];
                        });
                    }
                }}
                annotations={annotations}
                setOptions={{
                    showLineNumbers: true,
                    useWorker: false,
                    tabSize: 4,
                }}
                keyboardHandler="vscode"
                defaultValue={`{
    "hello": "world",
    "bool": true
}`}
            />
        </div>
    );
}
