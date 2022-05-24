import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useTest } from "../../../utils/Test";
import TestInput from "./TestInput";

export default function TestSlide() {
    const formRef = useRef(null);
    let test = useTest();
    let setObject = test.setObject;
    const [props, setProps] = useState([]);
    const [fields, setFields] = useState([v4()]);

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
                let isPresent = place.childNodes[0].checked;

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

    return (
        <>
            <form className="slide Test" id="config-test-slide" ref={formRef}>
                <h2>Test Api</h2>
                {fields.map((field) => (
                    <TestInput
                        key={field}
                        formRef={formRef}
                        placeHolderNames={["Test Header", "value"]}
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
