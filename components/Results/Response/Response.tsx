import Loader from "../Loader";
import { v4 } from "uuid";
import MonacoCodeEditor from "components/Editors/MonacoCodeEditor";
import CopyButton from "../CopyButton";
import { useEffect, useState } from "react";
import styles from "@styles/App.module.scss";
import {
    extractFileNameFromContentType,
    extractContentType,
} from "@utils/utils";
import { ImDownload } from "react-icons/im";
import { IoEyeOutline } from "react-icons/io5";
import fileExtensions from "@utils/fileExtensions.json";
import useDeviceType from "hooks/useDeviceType";
import AceCodeEditor from "components/Editors/AceCodeEditor";

export default function Response({ data, contentType, isFinished }) {
    let lang = extractFileNameFromContentType(contentType);
    let mimetype = ".json";
    const [openPreview, setOpenPreview] = useState(false);
    let preview = false;
    let endLoop = false;
    let rawContentType = extractContentType(contentType);
    const isMobile = useDeviceType();

    if (lang === "html") {
        preview = true;
    }

    for (let i = 0; i < fileExtensions.length; i++) {
        const ext = fileExtensions[i];
        for (let i = 0; i < ext.contentType.length; i++) {
            const ct = ext.contentType[i];

            if (rawContentType === ct) {
                mimetype = ext.label;
                endLoop = true;
                break;
            }
        }
        if (endLoop) break;
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
                    Response <div className="name">{mimetype}</div>
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
                            <IoEyeOutline />
                        </button>
                    )}
                    <CopyButton data={data} />
                    <button
                        type="button"
                        data-tip="Download Response"
                        data-place="left"
                        onClick={() => {
                            var dataStr = `data:${extractContentType(
                                contentType
                            )};charset=utf-8,${encodeURIComponent(data)}`;
                            var dlAnchorElem = document.createElement("a");
                            dlAnchorElem.setAttribute("href", dataStr);
                            dlAnchorElem.setAttribute(
                                "download",
                                `${v4()}${mimetype}`
                            );
                            dlAnchorElem.click();
                            dlAnchorElem.remove();
                        }}>
                        <ImDownload />
                    </button>
                </div>
            </div>
            {openPreview && isFinished ? (
                <iframe
                    sandbox=" allow-scripts"
                    className={styles.previewPanel}
                    src="about:blank"
                    srcDoc={data}></iframe>
            ) : isMobile === "mobile" ? (
                <AceCodeEditor mode={lang} readOnly value={data} />
            ) : (
                <MonacoCodeEditor value={data} readOnly language={lang} />
            )}
        </div>
    );
}
