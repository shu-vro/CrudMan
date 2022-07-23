import { useEffect, useRef, useState } from "react";
import Mustache from "mustache";
import { InputAuth } from ".";
import { useAuth } from "@utils/Auth";
import { useHistorySaver } from "@utils/HistorySaver";
import { useEnvironment } from "@utils/Env";
import ReactTooltip from "react-tooltip";
import { defineTooltip } from "@utils/utils";

export default function BasicSlide() {
    const formRef = useRef(null);
    const { setObject } = useAuth();
    const [defaultValue, setDefaultValue] = useState([]);
    const historySaver = useHistorySaver();
    const [tooltipTextForField, setTooltipTextForField] = useState("");
    const [tooltipTextForValue, setTooltipTextForValue] = useState("");
    const environment = useEnvironment();

    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);

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

    return (
        <form
            className="slide authSlide Basic"
            ref={formRef}
            onInput={() => {
                let methodFromAuthSlide: string = "basic";
                let formData = new FormData(formRef.current);
                let username = formData.get("basic_username");
                let password = formData.get("basic_password");
                try {
                    username = Mustache.render(username, environment.variables);
                    password = Mustache.render(password, environment.variables);
                } catch (error) {}

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
                setObject(prev => {
                    return {
                        ...prev,
                        headers: { Authorization },
                        setObject,
                        methodFromAuthSlide,
                    };
                });
            }}>
            <h3>Basic Authentication</h3>
            <InputAuth
                FieldName="Username"
                name="basic_username"
                autoComplete="username"
                defaultValue={defaultValue?.[0]}
                data-html={true}
                data-place="bottom"
                data-tip={tooltipTextForField}
                onInput={e => {
                    let value = (e.target as HTMLInputElement).value;
                    defineTooltip(value, environment, setTooltipTextForField);
                }}
            />
            <InputAuth
                FieldName="Password"
                name="basic_password"
                autoComplete="current-password"
                defaultValue={defaultValue?.[1]}
                data-html={true}
                data-place="bottom"
                data-tip={tooltipTextForValue}
                onInput={e => {
                    let value = (e.target as HTMLInputElement).value;
                    defineTooltip(value, environment, setTooltipTextForValue);
                }}
            />
        </form>
    );
}
