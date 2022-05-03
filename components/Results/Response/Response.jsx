import dynamic from "next/dynamic";
import { useTheme } from "../../../utils/Theme";

const AceEditor = dynamic(
    async () => {
        let ace = await import("react-ace");
        require("ace-builds/src-noconflict/mode-json");
        require("ace-builds/src-noconflict/theme-dracula");
        require("ace-builds/src-noconflict/ext-searchbox");
        return ace;
    },
    {
        ssr: false,
        loading: () => <div>Loading editor...</div>,
    }
);

export default function Response({ data }) {
    const { value: theme } = useTheme();
    return (
        <div className="slide Response slide-selected">
            <h2>Response</h2>
            <AceEditor
                placeholder="Type code."
                mode="json"
                theme={theme === "dark" ? "dracula" : "github"}
                fontSize={14}
                width="100%"
                height="calc(100% - 100px)"
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                readOnly={true}
                wrapEnabled={true}
                setOptions={{
                    showLineNumbers: true,
                    useWorker: false,
                    tabSize: 4,
                }}
                value={`${JSON.stringify(data, null, 4)}`}
            />
        </div>
    );
}
