import { useEffect, useRef, useState } from "react";
import { InputAuth } from ".";
import { useAuth } from "@utils/Auth";
import { useHistorySaver } from "@utils/HistorySaver";

export default function BasicSlide() {
    const formRef = useRef(null);
    const { setObject } = useAuth();
    const [defaultValue, setDefaultValue] = useState([]);
    const historySaver = useHistorySaver();

    useEffect(() => {
        if (historySaver.defaultObject.authMethod !== "basic") return;
        if (
            Object.entries(historySaver.defaultObject.auth.headers).length > 0
        ) {
            let [[_, b]] = Object.entries(
                historySaver.defaultObject.auth.headers
            );
            let d = Buffer.from(b.replace("basic ", ""), "base64")
                .toString("utf8")
                .split(":");
            setDefaultValue(d);
        } else {
            setDefaultValue([]);
        }

        formRef.current?.dispatchEvent(
            new Event("input", {
                bubbles: true,
            })
        );
    }, [historySaver.defaultObject]);

    useEffect(() => {
        let methodFromAuthSlide: string = "basic";
        let form: HTMLFormElement = formRef.current;
        form.addEventListener("input", e => {
            e.preventDefault();
            let formData = new FormData(form);
            let username = formData.get("basic_username");
            let password = formData.get("basic_password");
            if (username === "")
                return setObject(prev => {
                    return {
                        ...prev,
                        headers: {},
                        params: {},
                        setObject,
                        methodFromAuthSlide,
                    };
                });
            let Authorization = `${methodFromAuthSlide} ${Buffer.from(
                `${username}:${password}`
            ).toString("base64")}`;
            // setObject({ Authorization, setObject, methodFromAuthSlide });
            setObject(prev => {
                return {
                    ...prev,
                    headers: { Authorization },
                    setObject,
                    methodFromAuthSlide,
                };
            });
        });
    }, [setObject]);

    return (
        <form className="slide authSlide Basic" ref={formRef}>
            <h3>Basic Authentication</h3>
            <InputAuth
                FieldName="Username"
                name="basic_username"
                autoComplete="username"
                defaultValue={defaultValue?.[0]}
            />
            <InputAuth
                FieldName="Password"
                type="password"
                name="basic_password"
                autoComplete="current-password"
                defaultValue={defaultValue?.[1]}
            />
        </form>
    );
}
