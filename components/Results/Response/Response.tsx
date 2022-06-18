import dynamic from "next/dynamic";
import { useTheme } from "@utils/Theme";
import Loader from "../Loader";

const AceEditor = dynamic(
    async () => {
        let ace = await import("react-ace");
        require("ace-builds/src-noconflict/mode-json");
        require("ace-builds/src-noconflict/theme-dracula");
        require("ace-builds/src-noconflict/theme-xcode");
        require("ace-builds/src-noconflict/ext-searchbox");
        return ace;
    },
    {
        ssr: false,
        loading: () => <div>Loading editor...</div>,
    }
);

export default function Response({ data, isFinished }) {
    const { value: theme } = useTheme();
    return (
        <div className="slide Response slide-selected">
            {!isFinished && <Loader />}
            <h2>Response</h2>
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
