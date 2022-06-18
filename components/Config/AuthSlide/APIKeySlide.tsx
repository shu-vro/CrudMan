import { useEffect, useRef, useId, useState } from "react";
import { InputAuth } from ".";
import { useAuth } from "@utils/Auth";
import { useParams } from "@utils/Params";
import { useHistorySaver } from "@utils/HistorySaver";

export default function APIKeySlide() {
    const formRef = useRef(null);
    const includeRef = useRef(null);
    const { setObject } = useAuth();
    const { setObject: setParams } = useParams();
    const [defaultValue, setDefaultValue] = useState([]);
    const historySaver = useHistorySaver();

    useEffect(() => {
        if (historySaver.defaultObject.authMethod !== "APIKey") return;
        if (Object.entries(historySaver.defaultObject.auth.params).length > 0) {
            let [[a, b]] = Object.entries(
                historySaver.defaultObject.auth.params
            );
            setDefaultValue([a, b]);
            includeRef.current.checked = true;
        } else if (
            Object.entries(historySaver.defaultObject.auth.headers).length > 0
        ) {
            let [[a, b]] = Object.entries(
                historySaver.defaultObject.auth.headers
            );
            setDefaultValue([a, b]);
            includeRef.current.checked = false;
        } else {
            setDefaultValue([]);
            includeRef.current.checked = false;
        }
        formRef.current?.dispatchEvent(
            new Event("input", {
                bubbles: true,
            })
        );
    }, [historySaver.defaultObject]);

    useEffect(() => {
        let methodFromAuthSlide: string = "APIKey";
        const form: HTMLFormElement = formRef.current;

        //

        form.addEventListener("input", e => {
            e.preventDefault();
            let formData = new FormData(form);
            let key = formData.get("api_access_key").toString();
            let checkbox = formData.get("api_access_checkbox");
            let value = formData.get("api_access_value");
            if (key === "")
                return setObject({
                    headers: {},
                    params: {},
                    setObject,
                    methodFromAuthSlide: "",
                });
            if (checkbox === "on") {
                setObject(prev => {
                    return {
                        ...prev,
                        headers: {},
                        params: { [key]: value },
                        setObject,
                        methodFromAuthSlide,
                    };
                });
            } else {
                setObject(prev => {
                    return {
                        ...prev,
                        headers: { [key]: value },
                        params: {},
                        setObject,
                        methodFromAuthSlide,
                    };
                });
            }
        });
    }, [setObject, setParams]);
    let id = useId();
    return (
        <form className="slide authSlide APIKey" ref={formRef}>
            <h3>Basic Authentication</h3>
            <label htmlFor={id}>Include in Query</label>
            <input
                type="checkbox"
                name="api_access_checkbox"
                id={id}
                value="on"
                title="Either to store the API key in the query or in headers."
                ref={includeRef}
            />
            <InputAuth
                FieldName="Key"
                name="api_access_key"
                defaultValue={defaultValue?.[0]}
            />
            <InputAuth
                FieldName="Value"
                name="api_access_value"
                defaultValue={defaultValue?.[1]}
            />
        </form>
    );
}
