import { useEffect, useState } from "react";
import { usePostBody } from "@utils/Body";
import { useHistorySaver } from "@utils/HistorySaver";
import dynamic from "next/dynamic";
import { useTheme } from "@utils/Theme";
import Loader from "components/Results/Loader";

const AceEditor = dynamic(
    async () => {
        let ace = await import("react-ace");
        require("ace-builds/src-noconflict/mode-json");
        require("ace-builds/src-noconflict/theme-dracula");
        require("ace-builds/src-noconflict/theme-xcode");
        require("ace-builds/src-noconflict/ext-searchbox");
        require("ace-builds/src-noconflict/keybinding-vscode");
        require("ace-builds/src-noconflict/ext-language_tools");
        return ace;
    },
    {
        ssr: false,
        loading: () => <Loader />,
    }
);

export default function BodySlide() {
    const { value: theme } = useTheme();
    const historySaver = useHistorySaver();
    const [annotations, setAnnotations] = useState([]);
    let postBody = usePostBody();
    const [postBodyCopy, setPostBodyCopy] = useState(
        JSON.stringify(postBody.object, null, 4)
    );
    useEffect(() => {
        Object.keys(postBody.object).length > 0 &&
            setPostBodyCopy(() => {
                let pb = postBody.object;
                return JSON.stringify(pb, null, 4);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postBody]);

    useEffect(() => {
        setPostBodyCopy(JSON.stringify(historySaver.defaultObject.body));
        postBody.setObject(historySaver.defaultObject.body);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historySaver.defaultObject]);

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
                onChange={(value, event) => {
                    const { row, column } = event.start;
                    setPostBodyCopy(value);
                    try {
                        let result = JSON.parse(value);
                        setAnnotations([]);
                        postBody.setObject(result);
                    } catch (error) {
                        setAnnotations(prev => {
                            let o = {
                                row,
                                column,
                                type: "error",
                                text: `Invalid JSON syntax at row: ${
                                    row + 1
                                } column:${column + 1}`,
                            };
                            let now = prev.filter(item => item.row !== o.row);
                            return [...now, o];
                        });
                    }
                }}
                annotations={annotations}
                setOptions={{
                    showLineNumbers: true,
                    useWorker: false,
                    tabSize: 4,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }}
                keyboardHandler="vscode"
                value={postBodyCopy}
            />
        </div>
    );
}
