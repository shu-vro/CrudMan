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
        defaultChecked?: boolean;
    }>;
    const [fields, setFields] = useState<FieldsType>([]);

    function addField() {
        setFields(prev => [...prev, { id: v4(), entry: {} }]);
    }

    function removeField(keyName: string) {
        setFields(prev => prev.filter(field => field.id !== keyName));
    }

    // useEffect(() => {
    //     console.log(test);
    // }, [test]);

    useEffect(() => {
        setObject({ props, setObject });
    }, [props, setObject]);

    useEffect(() => {
        /**
         * @type {HTMLFormElement}
         */
        let form = formRef.current;
        form.addEventListener("input", () => {
            let inputPlaces = form.querySelectorAll(".input-place");
            setProps([]);

            for (let i = 0; i < inputPlaces.length; i++) {
                const place = inputPlaces[i];
                let isPresent =
                    place.childNodes[0].querySelector("input").checked;

                if (!isPresent) continue;

                let section = place.childNodes[1].querySelector("select").value;
                let key = place.childNodes[1].querySelector("input").value;
                let operation = place.childNodes[2].value;
                let value = place.childNodes[3].querySelector(
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
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        defaultChecked: true,
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

    return (
        <>
            <form className="slide Test" id="config-test-slide" ref={formRef}>
                <h2>Test Api</h2>
                {fields.map(field => (
                    <TestInput
                        key={field.id}
                        keyName={field.id}
                        formRef={formRef}
                        placeHolderNames={["Test Header", "value"]}
                        removeField={removeField}
                        defaultChecked={field.defaultChecked}
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
