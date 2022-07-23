/* eslint-disable @next/next/no-img-element */
import Loader from "../Loader";
import { v4 } from "uuid";
import MonacoCodeEditor from "components/Editors/MonacoCodeEditor";
import CopyButton from "../CopyButton";
import React, { useEffect, useState } from "react";
import styles from "@styles/App.module.scss";
import {
    extractFileNameAndTypeFromContentType,
    extractContentType,
} from "@utils/utils";
import { ImDownload } from "react-icons/im";
import { IoEyeOutline } from "react-icons/io5";
import fileExtensions from "@utils/fileExtensions.json";
import useDeviceType from "hooks/useDeviceType";
import AceCodeEditor from "components/Editors/AceCodeEditor";

export default function Response({
    data,
    contentType,
    isFinished,
    arrayBuffer,
}) {
    const [lang, setLang] = useState(
        extractFileNameAndTypeFromContentType(contentType)[1]
    );
    const [preview, setPreview] = useState(false);
    const [mimetype, setMimetype] = useState(".json");
    const [openPreview, setOpenPreview] = useState(false);
    const [component, setComponent] = useState<React.ReactElement>();
    const isMobile = useDeviceType();

    function downloadFile() {
        var dataStr = `data:${extractContentType(
            contentType
        )};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
        var dlAnchorElem = document.createElement("a");
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", `${v4()}${mimetype}`);
        dlAnchorElem.click();
        dlAnchorElem.remove();
    }

    useEffect(() => {
        if (!isFinished) {
            setOpenPreview(false);
        }
    }, [isFinished]);

    useEffect(() => {
        // Setting mime type
        let endLoop = false;

        for (let i = 0; i < fileExtensions.length; i++) {
            const ext = fileExtensions[i];
            for (let i = 0; i < ext.contentType.length; i++) {
                const ct = ext.contentType[i];

                if (extractContentType(contentType) === ct) {
                    setMimetype(ext.label);
                    endLoop = true;
                    break;
                }
            }
            if (endLoop) break;
        }

        // Getting source and checking if it is a previewable file or not
        setLang(extractFileNameAndTypeFromContentType(contentType)[1]);
        if (!arrayBuffer) return;
        let _temp_lang_type =
            extractFileNameAndTypeFromContentType(contentType)[0].toLowerCase();

        let source = `data:${extractContentType(
            contentType
        )};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
        if (extractFileNameAndTypeFromContentType(contentType)[1] === "html") {
            setPreview(true);
            setComponent(
                <>
                    <iframe
                        sandbox=" allow-scripts"
                        className={styles.previewPanel}
                        src="about:blank"
                        srcDoc={data}></iframe>
                </>
            );
        } else if (_temp_lang_type === "image") {
            setPreview(true);
            setComponent(
                <>
                    <img src={source} alt="Preview" />
                </>
            );
        } else if (_temp_lang_type === "video") {
            setPreview(true);
            setComponent(
                <>
                    <video src={source}></video>
                </>
            );
        }
        // else if (_temp_lang_type === "application") {
        //     setPreview(true);
        //     setComponent(
        //         <>
        //             <iframe
        //                 className={styles.previewPanel}
        //                 src={source}></iframe>
        //         </>
        //     );
        // }
        else {
            setPreview(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

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
                        onClick={downloadFile}>
                        <ImDownload />
                    </button>
                </div>
            </div>
            {openPreview && isFinished ? (
                component
            ) : isMobile === "mobile" ? (
                <AceCodeEditor mode={lang} readOnly value={data} />
            ) : (
                <MonacoCodeEditor value={data} readOnly language={lang} />
            )}
        </div>
    );
}
