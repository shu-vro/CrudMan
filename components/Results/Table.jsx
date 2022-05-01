import styles from "../../css/App.module.scss";

export default function Table({ content }) {
    let object2Array = Object.entries(content);
    return (
        <table rules="all" frame="none" className={styles.table}>
            <tbody>
                {object2Array.map(([key, value]) => {
                    return (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{value}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
