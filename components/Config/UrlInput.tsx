import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "../../css/App.module.scss";
import { useApiData } from "../../utils/ApiData";
import { useHeaders } from "../../utils/Headers";
import { useAuth } from "../../utils/Auth";
import { useParams } from "../../utils/Params";
import { usePostBody } from "../../utils/Body";
import { useUrlData } from "../../utils/UrlData";
import { useHistorySaver } from "../../utils/HistorySaver";
import axios from "axios";
import { useTest } from "../../utils/Test";

export default function UrlInput() {
    let apiData = useApiData();
    let { object: headersObject } = useHeaders();
    let { object: paramsObject } = useParams();
    let { object: postBodyObject } = usePostBody();
    let urlData = useUrlData();
    let auth = useAuth();
    let history = useHistorySaver();
    let test = useTest();
    let { setObject: setObjectUrl } = urlData;
    // const [headerCopy, setHeaderCopy] = useState({});
    // const [paramsCopy, setParamsCopy] = useState({});
    let { setObject } = apiData;
    let { setObject: setHistory } = history;
    const formRef = useRef(null);
    const [processFinished, setProcessFinished] = useState(false);

    useEffect(() => {
        // setHeaderCopy(() => {
        //     let authHeaders = auth.headers;
        //     let h = { ...headers, ...authHeaders };
        //     delete h["setObject"];
        //     delete h["methodFromAuthSlide"];
        //     return h;
        // });
        // setParamsCopy(() => {
        //     let authParams = auth.params;
        //     let p = { ...paramsObject, ...authParams };
        //     return p;
        // });
    }, [headersObject, paramsObject, auth]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setProcessFinished(true);
        let form = formRef.current;
        let formData = new FormData(form);
        let entries = Object.fromEntries(formData.entries());

        try {
            let res = await axios.get("/api/headerParser", {
                params: {
                    params: { ...paramsObject, ...auth.params },
                    headers: { ...headersObject, ...auth.headers },
                    body: postBodyObject,
                    url: entries.baseURL,
                    method: entries.method,
                },
            });

            res = res.data;
            setObject({ ...res, setObject });
            setProcessFinished(false);
        } catch (error) {
            console.log(error);
            setObject({
                elapsedTime: 0,
                setObject,

                data: { message: error.message },
                headers: error.config.headers,
                status: error.response.status,
                statusText: error.response.statusText,
            });
            setProcessFinished(false);
        }
        setHistory(prev => [
            ...prev,
            {
                params: paramsObject,
                body: postBodyObject,
                headers: headersObject,
                url: entries.baseURL.toString(),
                method: entries.method.toString(),
                tests: test.props,
                time: new Date().toLocaleString(),
            },
        ]);
        // setObject: setHistory,
    }
    useEffect(() => {
        handleInput();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleInput() {
        let form = formRef.current;
        let formData = new FormData(form);
        let { baseURL, method } = Object.fromEntries(formData.entries());
        let url = (baseURL as string).split("?");
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
            onChange={handleInput}>
            <select name="method" value={urlData.method} onChange={() => true}>
                <option value="Get">Get</option>
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
            <button type="submit" disabled={processFinished}>
                Send
            </button>
        </form>
    );
}
