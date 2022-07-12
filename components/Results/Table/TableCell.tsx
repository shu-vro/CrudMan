import Tooltip from "components/Tooltip";
import CopyButton from "../CopyButton";

export default function TableCell({
    testing = false,
    keyName,
    value,
    i,
    arrayLength,
}) {
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
                    <CopyButton data={value} />
                    {i === arrayLength && <Tooltip />}
                </td>
            )}
        </tr>
    );
}
