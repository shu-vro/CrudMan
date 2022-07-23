import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

export default function CopyButton({ data }) {
    const [copied, setCopied] = useState(false);
    return (
        <button
            type="button"
            data-tip="Copy"
            data-place="bottom"
            onClick={async () => {
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
            {copied ? <TiTick /> : <IoCopyOutline />}
        </button>
    );
}
