import React from "react";
// import { IAceEditorProps } from "react-ace";
import dynamic from "next/dynamic";
import { useTheme } from "@utils/Theme";
import Loader from "components/Results/Loader";

const AceEditor = dynamic(
    async () => {
        let ace = await import("react-ace");
        require("ace-builds/src-noconflict/mode-json");
        require("ace-builds/src-noconflict/mode-puppet");
        require("ace-builds/src-noconflict/mode-vbscript");
        require("ace-builds/src-noconflict/mode-json");
        require("ace-builds/src-noconflict/mode-javascript");
        require("ace-builds/src-noconflict/mode-python");
        require("ace-builds/src-noconflict/mode-dart");
        require("ace-builds/src-noconflict/mode-csharp");

        require("ace-builds/src-noconflict/theme-dracula");
        require("ace-builds/src-noconflict/theme-xcode");

        require("ace-builds/src-noconflict/ext-searchbox");
        require("ace-builds/src-noconflict/ext-language_tools");

        require("ace-builds/src-noconflict/keybinding-vscode");
        return ace;
    },
    {
        ssr: false,
        loading: () => <Loader />,
    }
);

export default function AceCodeEditor({ value, ...rest }) {
    const { value: theme } = useTheme();
    return (
        <AceEditor
            placeholder="Type code."
            mode="json"
            theme={theme === "dark" ? "dracula" : "xcode"}
            fontSize={13}
            width="100%"
            height="calc(100% - 100px)"
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            wrapEnabled={true}
            setOptions={{
                showLineNumbers: true,
                useWorker: false,
                tabSize: 4,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
            }}
            keyboardHandler="vscode"
            value={value}
            {...rest}
        />
    );
}
