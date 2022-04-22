import { useRef, useEffect, useState } from "react";
import { v4 } from "uuid";
import InputPlace from "../InputPlace";
import { useHeaders } from "../../../utils/Headers";

export default function HeaderSlide() {
    const formRef = useRef(null);
    let p = useHeaders();
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
                <h2>Http Headers</h2>
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
