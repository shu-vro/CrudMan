import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useHeaders } from "@utils/Headers";
import HeaderInput from "./HeaderInput";
import { useHistorySaver } from "@utils/HistorySaver";

export default function QuerySlide() {
    const formRef = useRef(null);
    let headers = useHeaders();
    const [props, setProps] = useState({});
    const historySaver = useHistorySaver();

    type FieldsType = Array<{
        id: string;
        entry?: [string?, any?];
        defaultChecked?: boolean;
    }>;
    const [fields, setFields] = useState<FieldsType>([
        { id: v4(), entry: ["", ""] },
    ]);

    function addField() {
        setFields([...fields, { id: v4(), entry: [] }]);
    }

    function removeField(keyName: string) {
        setFields(prev => prev.filter(field => field.id !== keyName));
    }

    useEffect(() => {
        headers.setObject(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    useEffect(() => {
        let entries = Object.entries(historySaver.defaultObject.headers);
        setFields([]);
        if (entries.length > 0) {
            entries.forEach(data => {
                setFields(prev => [
                    ...prev,
                    {
                        id: v4(),
                        entry: [data[0], data[1]],
                        defaultChecked: true,
                    },
                ]);
            });
        } else {
            setFields([{ id: v4(), entry: ["", ""] }]);
        }
        setTimeout(() => {
            formRef.current?.dispatchEvent(
                new Event("input", {
                    bubbles: true,
                })
            );
        }, 500);
    }, [historySaver.defaultObject]);

    function handleInput() {
        let inputPlace = formRef.current.querySelectorAll(".input-place");
        setProps({});
        for (let i = 0; i < inputPlace.length; i++) {
            const place = inputPlace[i];
            let isChecked = place.childNodes[0].querySelector("input").checked;
            if (isChecked !== true) continue;
            let key = place.childNodes[1].querySelector("input").value;
            let value = place.childNodes[2].value;
            if (!isNaN(Number(value))) {
                value = Number(value);
            } else if (value === "true") {
                value = true;
            } else if (value === "false") {
                value = false;
            }
            let o = {
                [key]: value,
            };
            setProps(prop => ({ ...prop, ...o }));
        }
    }

    return (
        <>
            <form
                className="slide Header"
                id="config-header-slide"
                ref={formRef}
                onInput={handleInput}>
                <h2>HTTP Headers</h2>
                {fields.map(field => (
                    <HeaderInput
                        key={field.id}
                        keyName={field.id}
                        formRef={formRef}
                        defaultValue={field.entry}
                        removeField={removeField}
                        placeHolderNames={["header", "value"]}
                        defaultChecked={field.defaultChecked}
                    />
                ))}

                <button
                    type="button"
                    className="add-row-button"
                    onClick={() => addField()}>
                    + Add Row
                </button>
            </form>
        </>
    );
}
