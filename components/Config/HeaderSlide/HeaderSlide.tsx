import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useHeaders } from "../../../utils/Headers";
import HeaderInput from "./HeaderInput";

export default function QuerySlide() {
    const formRef = useRef(null);
    let headers = useHeaders();
    let setObject = headers.setObject;
    const [props, setProps] = useState({});

    useEffect(() => {
        setObject({ ...props, setObject });
    }, [props, setObject]);

    useEffect(() => {
        /**
         * @type {HTMLFormElement}
         */
        let form = formRef.current;
        form.addEventListener("input", () => {
            let inputPlace = form.querySelectorAll(".input-place");
            setProps({});
            for (let i = 0; i < inputPlace.length; i++) {
                const place = inputPlace[i];
                let isChecked = place.childNodes[0].checked;
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
                setProps((prop) => ({ ...prop, ...o }));
            }
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

    return (
        <>
            <form
                className="slide Header"
                id="config-header-slide"
                ref={formRef}
            >
                <h2>HTTP Headers</h2>
                {fields.map((field) => (
                    <HeaderInput
                        key={field}
                        formRef={formRef}
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
