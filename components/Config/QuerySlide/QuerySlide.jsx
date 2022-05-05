import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useParams } from "../../../utils/Params";
import { useUrlData } from "../../../utils/UrlData";
import InputPlace from "./InputPlace";

export default function QuerySlide() {
    const formRef = useRef(null);
    let param = useParams();
    let urlData = useUrlData();
    const setObject = param.setObject;
    const [props, setProps] = useState({});

    useEffect(() => {
        console.log(urlData);
    }, [urlData]);
    useEffect(() => {
        setObject(props);
    }, [props, setObject]);

    useEffect(() => {
        /**
         * @type {HTMLFormElement}
         */
        let form = formRef.current;
        form.addEventListener("input", () => {
            // let formData = new FormData(form);
            // let entries = Object.fromEntries(formData.entries());
            // let search = `${urlData.baseURL}?${new URLSearchParams(
            //     entries
            // ).toString()}`;
            // let setObject = param.setObject;
            // setObject({ setObject, ...entries });
            let inputPlace = form.querySelectorAll(".input-place");
            setProps({});
            for (let i = 0; i < inputPlace.length; i++) {
                const place = inputPlace[i];
                let isChecked = place.childNodes[0].checked;
                if (isChecked !== true) continue;
                let key = place.childNodes[1].value;
                let value = place.childNodes[2].value;
                let o = {
                    [key]: value,
                };
                setProps((prop) => ({ ...prop, ...o }));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [fields, setFields] = useState([v4()]);

    useEffect(() => {
        console.log(param);
    }, [param]);

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
                        formRef={formRef}
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
