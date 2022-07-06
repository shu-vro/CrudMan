import { useState } from "react";
import { CopySvg, CorrectSvg } from "components/Nav/ButtonSvg";
import Tooltip from "components/Tooltip";

export default function TableCell({
    testing = false,
    keyName,
    value,
    i,
    arrayLength,
}) {
    const [copied, setCopied] = useState(false);
    return (
        <tr>
            <td>{keyName}</td>
            {testing ? (
                <td>
                    <span
                        style={{
                            border: `2px solid`,
                            color: value === "passed" ? "var(--green)" : "red",
                            borderColor:
                                value === "passed" ? "var(--green)" : "red",
                        }}>
                        {value}
                    </span>
                </td>
            ) : (
                <td>
                    {value}
                    <button
                        type="button"
                        data-tip="Copy"
                        data-place="left"
                        onClick={async e => {
                            try {
                                await navigator.clipboard.writeText(value);

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
                    {i === arrayLength && <Tooltip />}
                </td>
            )}
        </tr>
    );
}
