import Loader from "../Loader";
import { DownloadSvg, PreviewSvg } from "components/Nav/ButtonSvg";
import { v4 } from "uuid";
import MonacoCodeEditor from "components/Editors/MonacoCodeEditor";
import CopyButton from "../CopyButton";
import { useEffect, useState } from "react";
import styles from "@styles/App.module.scss";
import { extractFileNameFromContentType } from "@utils/utils";

export default function Response({ data, contentType, isFinished }) {
    let lang = extractFileNameFromContentType(contentType);
    const [openPreview, setOpenPreview] = useState(false);
    let preview = false;

    if (lang === "html") {
        preview = true;
    }

    useEffect(() => {
        if (!isFinished) {
            setOpenPreview(false);
        }
    }, [isFinished]);

    return (
        <div className="slide Response slide-selected">
            {!isFinished && <Loader />}
            <div className="slide-options">
                <h2>
                    Response <div className="name">{lang}</div>
                </h2>
                <div className="slide-option-buttons">
                    {preview && (
                        <button
                            type="button"
                            data-tip="Preview"
                            data-place="left"
                            onClick={() => {
                                setOpenPreview(!openPreview);
                            }}>
                            <PreviewSvg />
                        </button>
                    )}
                    <CopyButton data={data} />
                    <button
                        type="button"
                        data-tip="Download Response"
                        data-place="left"
                        onClick={() => {
                            var dataStr =
                                "data:text/plain;charset=utf-8," +
                                encodeURIComponent(data);
                            var dlAnchorElem = document.createElement("a");
                            dlAnchorElem.setAttribute("href", dataStr);
                            dlAnchorElem.setAttribute(
                                "download",
                                `${v4()}.txt`
                            );
                            dlAnchorElem.click();
                            dlAnchorElem.remove();
                        }}>
                        <DownloadSvg />
                    </button>
                </div>
            </div>
            {openPreview && isFinished ? (
                <iframe
                    sandbox=" allow-scripts"
                    className={styles.previewPanel}
                    src="about:blank"
                    srcDoc={data}></iframe>
            ) : (
                <MonacoCodeEditor value={data} readOnly language={lang} />
            )}
        </div>
    );
}
