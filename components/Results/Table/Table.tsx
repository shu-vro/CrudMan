import { ReactNode } from "react";
import styles from "@styles/Table.module.scss";
import TableCell from "./TableCell";

export default function Table({ content, header = [], testing = false }) {
    let object2Array: [string, ReactNode][] = Object.entries(content);
    return (
        <>
            <table rules="all" className={styles.table}>
                <thead>
                    <tr>
                        <th>{header[0]}</th>
                        <th>{header[1]}</th>
                    </tr>
                </thead>
                <tbody>
                    {object2Array.map(([key, value], i) => {
                        return (
                            <TableCell
                                key={key}
                                testing={testing}
                                keyName={key}
                                value={value}
                                i={i}
                                arrayLength={object2Array.length - 1}
                            />
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
