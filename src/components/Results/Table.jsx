import styles from "../../css/App.module.scss";

export default function Table({ header, content }) {
    let object2Array = Object.entries(content);
    return (
        <table rules="all" frame="none" className={styles.table}>
            <tr>
                <th>Header 1</th>
                <th>Header 2</th>
            </tr>
            {object2Array.map(([key, value]) => {
                return (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>
                );
            })}
        </table>
    );
}
