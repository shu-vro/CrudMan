import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Mustache from "mustache";
import styles from "@styles/App.module.scss";
import { useApiData } from "@utils/ApiData";
import { useHeaders } from "@utils/Headers";
import { useAuth } from "@utils/Auth";
import { useParams } from "@utils/Params";
import { usePostBody } from "@utils/Body";
import { useUrlData } from "@utils/UrlData";
import { useHistorySaver } from "@utils/HistorySaver";
import { useTest } from "@utils/Test";
import { useEnvironment } from "@utils/Env";
import { defineTooltip } from "@utils/utils";

export default function UrlInput() {
    let { setObject } = useApiData();
    let { object: headersObject } = useHeaders();
    let { object: paramsObject } = useParams();
    let { object: postBodyObject } = usePostBody();
    let urlData = useUrlData();
    let auth = useAuth();
    const environment = useEnvironment();
    let { setObject: setHistory } = useHistorySaver();
    let { props: testProps } = useTest();
    const formRef = useRef(null);
    const cancelControllerSource = useRef<any>();
    const [processing, setProcessing] = useState(false);
    const [tooltipText, setTooltipText] = useState("");

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
        let up = url[1];
        try {
            Mustache.tags = ["<<", ">>"];
            up = Mustache.render(url[1], environment.variables);
        } catch (error) {}
        let urlParams = Object.fromEntries(new URLSearchParams(up));
        defineTooltip(baseURL.toString(), environment, setTooltipText);
        urlData.setObject({
            urlParams,
            baseURL: baseURLCopy,
            url: baseURL.toString(),
            method: method.toString(),
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setProcessing(true);
        let form = formRef.current;
        let formData = new FormData(form);
        let entries = Object.fromEntries(formData.entries());
        setObject(prev => ({ ...prev, isFinished: false }));
        let baseURL_with_env_vars = entries.baseURL.toString();
        let paramsObjectCopy = { ...paramsObject, ...auth.params };
        let headersObjectCopy = { ...headersObject, ...auth.headers };
        let postBodyObjectCopy = { ...postBodyObject };
        try {
            baseURL_with_env_vars = Mustache.render(
                baseURL_with_env_vars,
                environment.variables
            );
            paramsObjectCopy = JSON.parse(
                Mustache.render(
                    JSON.stringify(paramsObjectCopy),
                    environment.variables
                )
            );
            headersObjectCopy = JSON.parse(
                Mustache.render(
                    JSON.stringify(headersObjectCopy),
                    environment.variables
                )
            );
            postBodyObjectCopy = JSON.parse(
                Mustache.render(
                    JSON.stringify(postBodyObjectCopy),
                    environment.variables
                )
            );
        } catch (error) {}

        try {
            cancelControllerSource.current = axios.CancelToken.source();
            let { data: res } = await axios.get("/api/headerParser", {
                cancelToken: cancelControllerSource.current.token,
                params: {
                    params: paramsObjectCopy,
                    headers: headersObjectCopy,
                    body: postBodyObjectCopy,
                    url: baseURL_with_env_vars,
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
            onInput={handleInput}
            data-html={true}
            data-place="bottom"
            data-tip={tooltipText}>
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
