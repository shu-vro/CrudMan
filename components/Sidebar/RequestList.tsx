import { usePostBody } from "../../utils/Body";
import { useTest } from "../../utils/Test";
import { useUrlData } from "../../utils/UrlData";
import { useHistorySaver } from "../../utils/HistorySaver";
import { HistoryType } from "../../utils/HistorySaver";
import { useApiData } from "../../utils/ApiData";

export default function RequestList({ history }: { history: HistoryType }) {
    const body = usePostBody();
    const urlData = useUrlData();
    const test = useTest();
    const apiData = useApiData();
    const historySaver = useHistorySaver();

    function handleClick() {
        urlData.setObject(prev => ({
            ...prev,
            baseURL: history.url,
            url: history.url,
            method: history.method,
        }));
        body.setObject(history.body);
        historySaver.setDefaultObject(history);
    }

    // useEffect(() => {
    //     console.log(params, body, test, headers, urlData, history);
    // }, [params, body, test, headers, urlData, history]);

    return (
        <li onClick={handleClick} title={history.time}>
            <span>{history.method}</span>
            <h4>{history.url}</h4>
            <button type="button">&times;</button>
        </li>
    );
}
