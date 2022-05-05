import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useTest } from "../../../utils/Test";
import TestInput from "./TestInput";
import allHeaders from "../../../utils/data.json";

export default function QuerySlide() {
    const formRef = useRef(null);
    let test = useTest();
    const [testCopy, setTestCopy] = useState({});

    useEffect(() => {
        let t = { ...test };
        delete t["setObject"];
        console.log(t);
    }, [test]);

    useEffect(() => {
        /**
         * @type {HTMLFormElement}
         */
        let form = formRef.current;
        form.addEventListener("input", () => {
            // let formData = new FormData(form);
            // let entries = Object.fromEntries(formData.entries());
            // let setObject = test.setObject;
            // setObject({ setObject, ...entries });
            let inputPlace = form.querySelectorAll(".input-place");

            inputPlace.forEach((place) => {
                let key = place.childNodes[1].querySelector("input").value;
                let operation = place.childNodes[2].value;
                let value = place.childNodes[3].value;

                let o = {
                    key,
                    operation,
                    value,
                };
                console.log(o);
                let setObject = test.setObject;
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [fields, setFields] = useState([v4()]);

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
                        parentForm="config-test-slide"
                        placeHolderNames={["test", "value"]}
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
