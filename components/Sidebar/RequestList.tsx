import { useUrlData } from "@utils/UrlData";
import { useHistorySaver } from "@utils/HistorySaver";
import { HistoryType } from "@utils/HistorySaver";
import { RiDeleteBin5Line } from "react-icons/ri";
import styles from "@styles/Sidebar.module.scss";

export default function RequestList({ history }: { history: HistoryType }) {
    const urlData = useUrlData();
    const historySaver = useHistorySaver();

    function handleClick() {
        urlData.setObject(prev => ({
            ...prev,
            baseURL: history.url,
            url: history.url,
            method: history.method,
        }));
        historySaver.setDefaultObject(history);
    }

    function handleRemove(id: string) {
        let { object: data } = historySaver;
        let newData = data.filter(h => h.time !== id);
        historySaver.setObject(newData);
    }

    return (
        <li onClick={handleClick}>
            <span
                className={`${
                    Number(history.status) > 400 ? "error" : ""
                } requestMethod`}>
                {history.method}
            </span>
            <h4 data-tip={history.time}>{history.url}</h4>
            <button
                className={styles.removeButton}
                type="button"
                data-tip="Delete"
                data-place="left"
                onClick={e => {
                    e.stopPropagation();
                    handleRemove(history.time);
                }}>
                <RiDeleteBin5Line />
            </button>
        </li>
    );
}
