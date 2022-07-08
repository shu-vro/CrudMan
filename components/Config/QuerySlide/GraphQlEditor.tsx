import dynamic from "next/dynamic";
import Loader from "components/Results/Loader";
import { useParams } from "@utils/Params";
import { useTheme } from "@utils/Theme";
import { useState } from "react";

const AceEditor = dynamic(
    async () => {
        let ace = await import("react-ace");
        require("ace-builds/src-noconflict/mode-puppet");
        require("ace-builds/src-noconflict/theme-dracula");
        require("ace-builds/src-noconflict/theme-xcode");
        require("ace-builds/src-noconflict/keybinding-vscode");
        require("ace-builds/src-noconflict/ext-language_tools");
        require("ace-builds/src-noconflict/ext-searchbox");
        return ace;
    },
    {
        ssr: false,
        loading: () => <Loader />,
    }
);

export default function GraphQlEditor() {
    const param = useParams();
    const { value: theme } = useTheme();
    const [value, setValue] = useState(``);

    return (
        <>
            <h2>GraphQl Query</h2>
            <AceEditor
                placeholder="Type code."
                mode="puppet"
                theme={theme === "dark" ? "dracula" : "xcode"}
                fontSize={14}
                showPrintMargin={true}
                name="graphql-editor"
                showGutter={true}
                highlightActiveLine={true}
                wrapEnabled={true}
                onChange={(value, event) => {
                    setValue(value);
                    param.setObject(prev => ({ query: value }));
                }}
                value={value}
                width="100%"
                height="calc(100% - 100px)"
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                    useWorker: false,
                }}
            />
        </>
    );
}
