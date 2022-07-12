import React from "react";
import { useTheme } from "@utils/Theme";
import Loader from "components/Results/Loader";
import Editor from "@monaco-editor/react";

export default function MonacoCodeEditor({ value, readOnly = false, ...rest }) {
    const { value: theme } = useTheme();
    return (
        <Editor
            language="json"
            theme={theme === "dark" ? "vs-dark" : "light"}
            className="transparent-editor"
            width="100%"
            height="calc(100% - 100px)"
            options={{
                minimap: { enabled: true, scale: 1, showSlider: "always" },
                wordWrap: "on",
                tabSize: 4,
                contextmenu: true,
                fontSize: 13,
                readOnly,
            }}
            value={value}
            loading={<Loader />}
            {...rest}
        />
    );
}
