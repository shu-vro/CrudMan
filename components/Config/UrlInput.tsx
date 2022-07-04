import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "@styles/App.module.scss";
import axios from "axios";
import { useApiData } from "@utils/ApiData";
import { useHeaders } from "@utils/Headers";
import { useAuth } from "@utils/Auth";
import { useParams } from "@utils/Params";
import { usePostBody } from "@utils/Body";
import { useUrlData } from "@utils/UrlData";
import { useHistorySaver } from "@utils/HistorySaver";
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
    const formRef = useRef(null);
    const cancelControllerSource = useRef<any>();
    const [processing, setProcessing] = useState(false);
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

    async function handleSubmit() {
        setProcessing(true);
        let form = formRef.current;
        let formData = new FormData(form);
        let entries = Object.fromEntries(formData.entries());
        setObject(prev => ({ ...prev, isFinished: false }));

        try {
            cancelControllerSource.current = axios.CancelToken.source();
            let { data: res } = await axios.get("/api/headerParser", {
                cancelToken: cancelControllerSource.current.token,
                params: {
                    params: { ...paramsObject, ...auth.params },
                    headers: { ...headersObject, ...auth.headers },
                    body: postBodyObject,
                    url: entries.baseURL,
                    method: entries.method,
                },
            });

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
                    time: new Date()
                        .toISOString()
                        .replace("T", " ")
                        .replace("Z", ""),
                    auth: { headers: auth.headers, params: auth.params },
                    authMethod: auth.methodFromAuthSlide,
                },
            ]);
            setProcessing(false);
        } catch (error) {
            console.log(error);
            setObject({
                elapsedTime: 0,
                headers: error.config?.headers || {},
                status: error.response?.status || 499,
                statusText: error.response?.statusText || error.code,
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
                    status: error.response?.status || 499,
                    time: new Date()
                        .toISOString()
                        .replace("T", " ")
                        .replace("Z", ""),
                    auth: { headers: auth.headers, params: auth.params },
                    authMethod: auth.methodFromAuthSlide,
                },
            ]);
        }
    }

    function handleCancel() {
        cancelControllerSource.current.cancel();
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
            {processing ? (
                <button
                    type="button"
                    disabled={!processing}
                    className={styles.buttonDisabled}
                    onClick={handleCancel}>
                    Cancel
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={processing}>
                    Send
                </button>
            )}
        </form>
    );
}
