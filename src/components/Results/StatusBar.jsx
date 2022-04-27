import numeral from "numeral";

export default function StatusBar({ status, size, time }) {
    return (
        <>
            <ul className="statusBar">
                <li>
                    Status{" "}
                    <span className={`status`}>{`${status || "-"}`}</span>
                </li>
                <li>
                    Size{" "}
                    <span className={`status`}>{`${
                        numeral(size).format("0.0b") || "-"
                    }`}</span>
                </li>
                <li>
                    Time <span className={`status`}>{`${time || "-"}s`}</span>
                </li>
            </ul>
        </>
    );
}
