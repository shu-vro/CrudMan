import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useTest } from "@utils/Test";
import TestInput from "./TestInput";
import { useHistorySaver } from "@utils/HistorySaver";

export default function TestSlide() {
    const formRef = useRef(null);
    const test = useTest();
    const historySaver = useHistorySaver();
    let setObject = test.setObject;
    const [props, setProps] = useState([]);

    type FieldsType = Array<{
        id: string;
        entry?: {
            section?: string;
            key?: string;
            operation?: string;
            value?: string;
        };
    }>;
    const [fields, setFields] = useState<FieldsType>([]);

    function addField() {
        setFields(prev => [...prev, { id: v4(), entry: {} }]);
    }

    function removeField(keyName: string) {
        setFields(prev => prev.filter(field => field.id !== keyName));
    }

    useEffect(() => {
        setObject({ props, setObject });
    }, [props, setObject]);

    useEffect(() => {
        let entries = Object.keys(historySaver.defaultObject.tests);
        setFields([]);
        if (entries.length > 0) {
            entries.forEach(data => {
                setFields(prev => [
                    ...prev,
                    {
                        id: v4(),
                        entry: {
                            ...historySaver.defaultObject.tests[data],
                        },
                    },
                ]);
            });
        } else {
            setFields([{ id: v4(), entry: {} }]);
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
        let inputPlaces = formRef.current.querySelectorAll(".input-place");
        setProps([]);

        for (let i = 0; i < inputPlaces.length; i++) {
            const place = inputPlaces[i];
            let section = place.childNodes[0].querySelector("select").value;
            if (section === "") continue;

            let key = place.childNodes[0].querySelector("input").value;
            if (section === "Headers" && key === "") continue;
            if (section === "Headers" && key === "") continue;
            let operation = place.childNodes[1].value;
            let value = place.childNodes[2].querySelector(
                ".select-container input"
            ).value;

            if (!isNaN(value)) {
                value = Number(value);
            } else if (value === "true") {
                value = true;
            } else if (value === "false") {
                value = false;
            }

            let o = {
                section,
                key,
                operation,
                value,
            };
            setProps(prop => {
                return [...prop, o];
            });
        }
    }

    return (
        <>
            <form
                className="slide Test"
                id="config-test-slide"
                ref={formRef}
                onInput={handleInput}>
                <h2>Test Api</h2>
                {fields.map(field => (
                    <TestInput
                        key={field.id}
                        keyName={field.id}
                        formRef={formRef}
                        placeHolderNames={["Test Header", "value"]}
                        removeField={removeField}
                        entry={field.entry}
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
