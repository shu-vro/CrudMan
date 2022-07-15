import { useRef } from "react";
import { useHistorySaver } from "@utils/HistorySaver";
import RequestList from "./RequestList";
import styles from "@styles/Sidebar.module.scss";
import { FiDelete } from "react-icons/fi";
import Tooltip from "components/Tooltip";

export default function Histories() {
    const listRequestRef = useRef(null);
    const historySaver = useHistorySaver();

    function handleSearch(e: React.FormEvent<HTMLInputElement>) {
        let listRequests: HTMLLIElement = listRequestRef.current;
        let value = (e.target as HTMLInputElement).value.toUpperCase();

        let li = listRequests.querySelectorAll("li");

        for (let i = 0; i < li.length; i++) {
            const l = li[i].textContent.toUpperCase();
            if (l.includes(value)) li[i].style.display = "flex";
            else li[i].style.display = "none";
        }
    }

    return (
        <div className={styles.sidebar_histories}>
            <div className={styles.inputAndButton}>
                <input
                    type="search"
                    onInput={handleSearch}
                    placeholder="Search"
                />
                <button
                    type="button"
                    onClick={() => {
                        historySaver.setObject([]);
                    }}>
                    <FiDelete data-tip="Clear All" data-place="left" />
                </button>
            </div>
            <ul className={styles.list_requests} ref={listRequestRef}>
                {historySaver.object
                    .slice()
                    .reverse()
                    .map(h => (
                        <RequestList key={h.time} history={h} />
                    ))}
            </ul>
            <Tooltip />
        </div>
    );
}
