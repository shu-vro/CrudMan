import numeral from "numeral";

export default function StatusBar({ status, statusText, size, time }) {
    return (
        <>
            <ul className="statusBar">
                <form id="noId"></form>
                <li>
                    Status:{" "}
                    <span className={`status ${status >= 400 && "error"}`}>{`${
                        status || "-"
                    } ${statusText || ""}`}</span>
                </li>
                <li>
                    Size:{" "}
                    <span className={`status ${status >= 400 && "error"}`}>{`${
                        (status >= 400 && "Error") ||
                        numeral(size).format("0.0b") ||
                        "-"
                    }`}</span>
                </li>
                <li>
                    Time: <span className={`status`}>{`${time || "-"}ms`}</span>
                </li>
            </ul>
        </>
    );
}
