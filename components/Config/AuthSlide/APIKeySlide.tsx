import { useEffect, useRef, useState } from "react";
import { InputAuth } from ".";
import { useAuth } from "@utils/Auth";
import { useHistorySaver } from "@utils/HistorySaver";
import Checkbox from "components/Checkbox";
import { defineTooltip } from "@utils/utils";
import { useEnvironment } from "@utils/Env";
import ReactTooltip from "react-tooltip";

export default function APIKeySlide() {
    const formRef = useRef(null);
    const includeRef = useRef(null);
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

    return (
        <form
            className="slide authSlide APIKey"
            ref={formRef}
            onInput={() => {
                let methodFromAuthSlide: string = "APIKey";
                let formData = new FormData(formRef.current);
                let key = formData.get("api_access_key").toString();
                let checkbox = formData.get("api_access_checkbox");
                let value = formData.get("api_access_value").toString();
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
            }}>
            <h3>Basic Authentication</h3>
            {/* <label>Include in Query</label> */}
            <Checkbox
                label="Include In Query"
                type="checkbox"
                name="api_access_checkbox"
                value="on"
                Ref={includeRef}
            />
            <InputAuth
                FieldName="Key"
                name="api_access_key"
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
                FieldName="Value"
                name="api_access_value"
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
