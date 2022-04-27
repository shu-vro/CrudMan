import { useEffect } from "react";
import styles from "../../css/App.module.scss";
import { useApiData } from "../../utils/ApiData";
import { request } from "../../utils/utils";

export default function UrlInput() {
    let apiData = useApiData();
    let { setObject } = apiData;

    useEffect(() => {
        request(
            "https://jsonplaceholder.typicode.com/posts/1",
            "get",
            { "Timing-Allow-Origin": "*" },
            {},
            {}
        ).then((res) => {
            console.log(res);
            setObject({ ...res, setObject });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <form className={styles.UrlInput}>
            <select>
                <option value="Get" defaultChecked>
                    Get
                </option>
                <option value="Post">Post</option>
                <option value="Put">Put</option>
                <option value="Patch">Patch</option>
                <option value="Delete">Delete</option>
            </select>
            <input type="text" placeholder="Enter a URL" />
            <button type="submit">Send</button>
        </form>
    );
}
