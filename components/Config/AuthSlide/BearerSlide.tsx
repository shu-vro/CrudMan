import { useEffect, useRef, useState } from "react";
import { useAuth } from "@utils/Auth";
import { useHistorySaver } from "@utils/HistorySaver";
import { defineTooltip } from "@utils/utils";
import { useEnvironment } from "@utils/Env";
import ReactTooltip from "react-tooltip";

export default function BearerSlide() {
    const formRef = useRef(null);
    const { setObject } = useAuth();
    const historySaver = useHistorySaver();
    const [defaultValue, setDefaultValue] = useState("");
    const [tooltipTextForField, setTooltipTextForField] = useState("");
    const environment = useEnvironment();

    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);

    useEffect(() => {
        if (historySaver.defaultObject.authMethod !== "bearer") return;
        if (
            Object.entries(historySaver.defaultObject.auth.headers).length > 0
        ) {
            let [[_, b]] = Object.entries(
                historySaver.defaultObject.auth.headers
            );
            setDefaultValue(b.replace("bearer ", ""));
        } else {
            setDefaultValue("");
        }

        formRef.current?.dispatchEvent(
            new Event("input", {
                bubbles: true,
            })
        );
    }, [historySaver.defaultObject]);

    return (
        <form
            className="slide authSlide Bearer"
            ref={formRef}
            onInput={() => {
                let methodFromAuthSlide: string = "bearer";
                let formData = new FormData(formRef.current);
                let token = formData.get("bearer_token");
                if (token === "")
                    return setObject(prev => {
                        return {
                            ...prev,
                            headers: {},
                            params: {},
                            setObject,
                            methodFromAuthSlide,
                        };
                    });
                let Authorization = `${methodFromAuthSlide} ${token}`;
                setObject(prev => {
                    return {
                        ...prev,
                        headers: { Authorization },
                        params: {},
                        setObject,
                        methodFromAuthSlide,
                    };
                });
            }}>
            <h3>Bearer Token</h3>
            <textarea
                name="bearer_token"
                id="bearer_token"
                cols={40}
                rows={10}
                defaultValue={defaultValue}
                data-html={true}
                data-place="bottom"
                data-tip={tooltipTextForField}
                onInput={e => {
                    let value = (e.target as HTMLInputElement).value;
                    defineTooltip(value, environment, setTooltipTextForField);
                }}></textarea>
        </form>
    );
}
