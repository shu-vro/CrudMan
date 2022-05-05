import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useTest } from "../../../utils/Test";
import TestInput from "./TestInput";
import allHeaders from "../../../utils/data.json";

export default function QuerySlide() {
    const formRef = useRef(null);
    let test = useTest();
    let setObject = test.setObject;
    const [props, setProps] = useState([]);
    const [fields, setFields] = useState([v4()]);

    useEffect(() => {
        console.log(test);
    }, [test]);

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
                console.log(place);
                let isPresent = place.childNodes[0].checked;

                if (!isPresent) continue;

                let key = place.childNodes[1].querySelector("input").value;
                let operation = place.childNodes[2].value;
                let value = place.childNodes[3].value;

                let o = {
                    key,
                    operation,
                    value,
                };
                setProps((prop) => {
                    return [...prop, o];
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addField = () => {
        setFields([...fields, v4()]);
    };
    const disableField = (key) => {
        test.setObject((prev) => {
            delete prev[key];
            return prev;
        });
    };
    const removeField = (fieldId, key) => {
        disableField(key);
        setFields(fields.filter((field) => field !== fieldId));
    };

    return (
        <>
            <form className="slide Test" id="config-test-slide" ref={formRef}>
                <h2>Test Api</h2>
                {fields.map((field) => (
                    <TestInput
                        key={field}
                        k={field}
                        removeField={removeField}
                        formRef={formRef}
                        placeHolderNames={["Test Header", "value"]}
                        allHeaders={allHeaders}
                    />
                ))}

                <button
                    type="button"
                    className="add-row-button"
                    onClick={() => addField()}
                >
                    + Add Row
                </button>
            </form>
        </>
    );
}
