import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useParams } from "../../../utils/Params";
import InputPlace from "../InputPlace";

export default function QuerySlide() {
    const formRef = useRef(null);
    let param = useParams();

    useEffect(() => {
        /**
         * @type {HTMLFormElement}
         */
        let form = formRef.current;
        form.addEventListener("input", () => {
            let formData = new FormData(form);
            let entries = Object.fromEntries(formData.entries());
            let setObject = param.setObject;
            setObject({ setObject, ...entries });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [fields, setFields] = useState([v4()]);

    const addField = () => {
        setFields([...fields, v4()]);
    };
    const disableField = (key) => {
        param.setObject((prev) => {
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
                className="slide Query slide-selected"
                id="config-query-slide"
                ref={formRef}
            >
                <h2>Query Parameters</h2>
                {fields.map((field) => (
                    <InputPlace
                        key={field}
                        k={field}
                        removeField={removeField}
                        parentForm="config-query-slide"
                        placeHolderNames={["parameter", "value"]}
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
