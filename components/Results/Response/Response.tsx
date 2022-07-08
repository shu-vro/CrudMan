import dynamic from "next/dynamic";
import { useTheme } from "@utils/Theme";
import Loader from "../Loader";
import { CopySvg, CorrectSvg, DownloadSvg } from "components/Nav/ButtonSvg";
import { useState } from "react";
import { v4 } from "uuid";

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
        loading: () => <Loader />,
    }
);

export default function Response({ data, isFinished }) {
    const [copied, setCopied] = useState(false);
    const { value: theme } = useTheme();
    return (
        <div className="slide Response slide-selected">
            {!isFinished && <Loader />}
            <div className="slide-options">
                <h2>Response</h2>
                <div className="slide-option-buttons">
                    <button
                        type="button"
                        data-tip="Copy"
                        data-place="bottom"
                        onClick={async e => {
                            try {
                                await navigator.clipboard.writeText(data);

                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 1500);
                            } catch (error) {
                                alert(
                                    `Your device is not compatible to copy code. \nThis error may occur if you are using this website without "https" protocol or with an insecure device.\n\nError Message: ${error.message}`
                                );
                            }
                        }}>
                        {copied ? <CorrectSvg /> : <CopySvg />}
                    </button>
                    <button
                        type="button"
                        data-tip="Download Response"
                        data-place="left"
                        onClick={e => {
                            var dataStr =
                                "data:text/json;charset=utf-8," +
                                encodeURIComponent(
                                    JSON.stringify(data, null, 4)
                                );
                            var dlAnchorElem = document.createElement("a");
                            dlAnchorElem.setAttribute("href", dataStr);
                            dlAnchorElem.setAttribute(
                                "download",
                                `${v4()}.json`
                            );
                            dlAnchorElem.click();
                            dlAnchorElem.remove();
                        }}>
                        <DownloadSvg />
                    </button>
                </div>
            </div>
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
