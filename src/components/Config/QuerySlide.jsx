import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useParams } from "../../utils/Params";
import InputPlace from "./InputPlace";

export default function QuerySlide() {
    const formRef = useRef(null);
    let p = useParams();
    useEffect(() => {
        /**
         * @type {HTMLFormElement}
         */
        let form = formRef.current;
        form.addEventListener("input", () => {
            let formData = new FormData(form);
            let entries = Object.fromEntries(formData.entries());
            let setObject = p.setObject;
            setObject({ setObject, ...entries });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(p);
    }, [p]);
    const [fields, setFields] = useState([v4()]);

    const addField = () => {
        setFields([...fields, v4()]);
    };
    const disableField = (key) => {
        p.setObject((prev) => {
            delete prev[key];
            return prev;
        });
    };
    const enableField = (key, value) => {
        p.setObject((prev) => {
            return { ...prev, [key]: value };
        });
    };
    const removeField = (fieldId, key) => {
        disableField(key);
        setFields(fields.filter((field) => field !== fieldId));
    };

    return (
        <form className="slide Query" id="config-query-slide" ref={formRef}>
            {fields.map((field) => (
                <InputPlace
                    key={field}
                    k={field}
                    removeField={removeField}
                    enableField={enableField}
                    disableField={disableField}
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
    );
}
