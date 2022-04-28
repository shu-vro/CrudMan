import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useHeaders } from "../../../utils/Headers";
import InputPlace from "../InputPlace";

export default function QuerySlide() {
    const formRef = useRef(null);
    let headers = useHeaders();

    useEffect(() => {
        /**
         * @type {HTMLFormElement}
         */
        let form = formRef.current;
        form.addEventListener("input", () => {
            let formData = new FormData(form);
            let entries = Object.fromEntries(formData.entries());
            let setObject = headers.setObject;
            setObject({ setObject, ...entries });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [fields, setFields] = useState([v4()]);

    // useEffect(() => {
    //     console.log(headers);
    // }, [headers]);

    const addField = () => {
        setFields([...fields, v4()]);
    };
    const disableField = (key) => {
        headers.setObject((prev) => {
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
            <form
                className="slide Header"
                id="config-header-slide"
                ref={formRef}
            >
                <h2>HTTP Headers</h2>
                {fields.map((field) => (
                    <InputPlace
                        key={field}
                        k={field}
                        removeField={removeField}
                        parentForm="config-header-slide"
                        placeHolderNames={["header", "value"]}
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
