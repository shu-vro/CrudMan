import { useEffect, useRef, useState } from "react";
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
    const [headerCopy, setHeaderCopy] = useState({});
    const [paramsCopy, setParamsCopy] = useState({});
    const [postBodyCopy, setPostBodyCopy] = useState({});
    let { setObject } = apiData;
    const formRef = useRef(null);
    useEffect(() => {
        console.log(apiData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiData]);

    useEffect(() => {
        setHeaderCopy(() => {
            let h = { ...headers };
            delete h["setObject"];
            return h;
        });
        setParamsCopy(() => {
            let p = { ...params };
            delete p["setObject"];
            return p;
        });
        setPostBodyCopy(() => {
            let pb = { ...postbody };
            delete pb["setObject"];
            return pb;
        });
    }, [headers, params, postbody]);

    async function handleSubmit(e) {
        let form = formRef.current;
        e.preventDefault();
        let formData = new FormData(form);
        let entries = Object.fromEntries(formData.entries());
        let start = Date.now();
        let res = await request(
            entries.baseURL,
            entries.method,
            headerCopy,
            paramsCopy,
            postBodyCopy
        );
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
