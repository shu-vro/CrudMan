import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "@styles/App.module.scss";
import { useApiData } from "@utils/ApiData";
import { useHeaders } from "@utils/Headers";
import { useAuth } from "@utils/Auth";
import { useParams } from "@utils/Params";
import { usePostBody } from "@utils/Body";
import { useUrlData } from "@utils/UrlData";
import { useHistorySaver } from "@utils/HistorySaver";
import axios from "axios";
import { useTest } from "@utils/Test";

export default function UrlInput() {
    let { setObject } = useApiData();
    let { object: headersObject } = useHeaders();
    let { object: paramsObject } = useParams();
    let { object: postBodyObject } = usePostBody();
    let urlData = useUrlData();
    let auth = useAuth();
    let { setObject: setHistory } = useHistorySaver();
    let { props: testProps } = useTest();
    // const [headerCopy, setHeaderCopy] = useState({});
    // const [paramsCopy, setParamsCopy] = useState({});
    const formRef = useRef(null);
    const [processing, setProcessing] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setProcessing(true);
        let form = formRef.current;
        let formData = new FormData(form);
        let entries = Object.fromEntries(formData.entries());
        setObject(prev => ({ ...prev, isFinished: false }));
        // setObject((prev) => { second })

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
            setObject({ ...res, isFinished: true });
            setHistory(prev => [
                ...prev,
                {
                    params: paramsObject,
                    body: postBodyObject,
                    headers: headersObject,
                    url: entries.baseURL.toString(),
                    method: entries.method.toString(),
                    tests: testProps,
                    status: res.status,
                    time: new Date().toLocaleString(),
                    auth: { headers: auth.headers, params: auth.params },
                },
            ]);
            setProcessing(false);
        } catch (error) {
            console.log(error);
            setObject({
                elapsedTime: 0,
                data: { message: error.message },
                headers: error.config.headers,
                status: error.response.status,
                statusText: error.response.statusText,
                isFinished: true,
            });
            setProcessing(false);
            setHistory(prev => [
                ...prev,
                {
                    params: paramsObject,
                    body: postBodyObject,
                    headers: headersObject,
                    url: entries.baseURL.toString(),
                    method: entries.method.toString(),
                    tests: testProps,
                    status: error.response.status,
                    time: new Date().toLocaleString(),
                    auth: { headers: auth.headers, params: auth.params },
                },
            ]);
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
        let url = (baseURL as string).split("?");
        let baseURLCopy = url[0];
        let urlParams = Object.fromEntries(new URLSearchParams(url[1]));
        urlData.setObject({
            urlParams,
            baseURL: baseURLCopy,
            url: baseURL.toString(),
            method: method.toString(),
        });
    }

    return (
        <form
            className={styles.UrlInput}
            onSubmit={handleSubmit}
            ref={formRef}
            autoComplete="on"
            onChange={handleInput}>
            <select
                name="method"
                value={urlData.object.method}
                onChange={() => true}>
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
                value={urlData.object.url}
                onChange={() => true}
            />
            <button type="submit" disabled={processing}>
                Send
            </button>
        </form>
    );
}
