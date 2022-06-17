import { usePostBody } from "../../utils/Body";
import { useTest } from "../../utils/Test";
import { useUrlData } from "../../utils/UrlData";
import { useHistorySaver } from "../../utils/HistorySaver";
import { HistoryType } from "../../utils/HistorySaver";
import { useApiData } from "../../utils/ApiData";

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

    // useEffect(() => {
    //     console.log(params, body, test, headers, urlData, history);
    // }, [params, body, test, headers, urlData, history]);

    return (
        <li onClick={handleClick} title={history.time}>
            <span className={history.status > 400 ? "error" : ""}>
                {history.method}
            </span>
            <h4>{history.url}</h4>
            <button
                type="button"
                onClick={e => {
                    e.stopPropagation();
                    handleRemove(history.time);
                }}>
                &times;
            </button>
        </li>
    );
}
