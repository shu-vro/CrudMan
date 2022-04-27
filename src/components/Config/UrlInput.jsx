import { useEffect, useRef } from "react";
import styles from "../../css/App.module.scss";
import { useApiData } from "../../utils/ApiData";
import { useHeaders } from "../../utils/Headers";
import { useParams } from "../../utils/Params";
import { usePostBody } from "../../utils/Body";
import { request } from "../../utils/utils";

export default function UrlInput() {
    let apiData = useApiData();
    let headers = useHeaders();
    let params = useParams();
    let postbody = usePostBody();
    let { setObject } = apiData;
    const formRef = useRef(null);
    useEffect(() => {
        console.log(apiData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiData]);

    async function handleSubmit(e) {
        let form = formRef.current;
        e.preventDefault();
        let formData = new FormData(form);
        let entries = Object.fromEntries(formData.entries());
        let start = Date.now();
        let res = await request(entries.baseURL, entries.method, {}, {}, {});
        let diff = Date.now() - start;
        setObject({ ...res, elapsedTime: diff, setObject });
    }

    return (
        <form
            className={styles.UrlInput}
            onSubmit={handleSubmit}
            ref={formRef}
            autoComplete={true}
        >
            <select name="method">
                <option value="Get" defaultChecked>
                    Get
                </option>
                <option value="Post">Post</option>
                <option value="Put">Put</option>
                <option value="Patch">Patch</option>
                <option value="Delete">Delete</option>
            </select>
            <input
                type="text"
                placeholder="Enter a URL"
                name="baseURL"
                defaultValue="https://jsonplaceholder.typicode.com/posts/1"
            />
            <button type="submit">Send</button>
        </form>
    );
}
