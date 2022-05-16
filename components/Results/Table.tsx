import { ReactNode } from "react";
import styles from "../../css/App.module.scss";

declare module "react" {
    interface TableHTMLAttributes<T> {
        rules?: string;
        [propName: string]: any;
    }
}

export default function Table({ content, header = [], testing = false }) {
    let object2Array: [string, ReactNode][] = Object.entries(content);
    return (
        <table rules="all" frame="none" className={styles.table}>
            <thead>
                <tr>
                    <th>{header[0]}</th>
                    <th>{header[1]}</th>
                </tr>
            </thead>
            <tbody>
                {object2Array.map(([key, value]) => {
                    return (
                        <tr key={key}>
                            <td>{key}</td>
                            {testing ? (
                                <td>
                                    <span
                                        style={{
                                            padding: `5px 10px`,
                                            borderRadius: `5px`,
                                            color: "var(--theme)",
                                            fontSize: "13px",
                                            backgroundColor:
                                                value === "passed"
                                                    ? "green"
                                                    : "red",
                                        }}
                                    >
                                        {value}
                                    </span>
                                </td>
                            ) : (
                                <td>{value}</td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
