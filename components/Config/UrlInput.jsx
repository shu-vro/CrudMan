import { useEffect, useRef, useState } from "react";
import styles from "../../css/App.module.scss";
import { useApiData } from "../../utils/ApiData";
import { useHeaders } from "../../utils/Headers";
import { useParams } from "../../utils/Params";
import { usePostBody } from "../../utils/Body";
import { useUrlData } from "../../utils/UrlData";
import axios from "axios";

export default function UrlInput() {
    let apiData = useApiData();
    let headers = useHeaders();
    let params = useParams();
    let postbody = usePostBody();
    let urlData = useUrlData();
    let setObjectUrl = urlData.setObject;
    const [headerCopy, setHeaderCopy] = useState({});
    const [paramsCopy, setParamsCopy] = useState({});
    const [postBodyCopy, setPostBodyCopy] = useState({});
    let { setObject } = apiData;
    const formRef = useRef(null);

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
        e.preventDefault();
        let form = formRef.current;
        let formData = new FormData(form);
        let entries = Object.fromEntries(formData.entries());

        try {
            let res = await axios.get("/api/headerParser", {
                params: {
                    params: paramsCopy,
                    headers: headerCopy,
                    body: postBodyCopy,
                    url: entries.baseURL,
                    method: entries.method,
                },
            });

            res = res.data;
            setObject({ ...res, setObject });
        } catch (error) {
            console.log(error);
            setObject({
                elapsedTime: "None",
                setObject,

                data: { message: error.message },
                headers: error.config.headers,
                status: error.response.status,
                statusText: error.response.statusText,
            });
        }
    }
    useEffect(() => {
        handleInput();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleInput() {
        let form = formRef.current;
        let formData = new FormData(form);
        let { baseURL, method } = Object.fromEntries(formData.entries());
        let url = baseURL.split("?");
        let baseURLCopy = url[0];
        let urlParams = Object.fromEntries(new URLSearchParams(url[1]));
        setObjectUrl({
            urlParams,
            baseURL: baseURLCopy,
            url: baseURL,
            setObject: setObjectUrl,
            method,
        });
    }

    return (
        <form
            className={styles.UrlInput}
            onSubmit={handleSubmit}
            ref={formRef}
            autoComplete="on"
            onChange={handleInput}
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
                value={urlData.url}
                onChange={() => true}
            />
            <button type="submit">Send</button>
        </form>
    );
}
