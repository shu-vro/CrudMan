import Loader from "../Loader";
import { CopySvg, CorrectSvg, DownloadSvg } from "components/Nav/ButtonSvg";
import { useState } from "react";
import { v4 } from "uuid";
import MonacoCodeEditor from "components/Editors/MonacoCodeEditor";

export default function Response({ data, isFinished }) {
    const [copied, setCopied] = useState(false);
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
            <MonacoCodeEditor value={data} readOnly />
        </div>
    );
}
