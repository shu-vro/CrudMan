import { useState } from "react";
import styles from "../../css/App.module.scss";

export default function Table({ header, content }) {
    const [ids, setIds] = useState([]);
    console.log(content);
    return (
        <table rules="all" frame="none" className={styles.table}>
            <tr>
                <th>Header 1</th>
                <th>Header 2</th>
            </tr>
            <tr>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr>
                <td>1</td>
                <td>1</td>
            </tr>
            <tr>
                <td>1</td>
                <td>1</td>
            </tr>
        </table>
    );
}
