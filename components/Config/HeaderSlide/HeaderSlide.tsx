import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useHeaders } from "../../../utils/Headers";
import HeaderInput from "./HeaderInput";
import { useHistorySaver } from "../../../utils/HistorySaver";

export default function QuerySlide() {
    const formRef = useRef(null);
    let headers = useHeaders();
    const [props, setProps] = useState({});
    const historySaver = useHistorySaver();

    const [fields, setFields] = useState<
        Array<{ id: string; entry?: [string?, any?] }>
    >([{ id: v4(), entry: ["", ""] }]);

    function addField() {
        setFields([...fields, { id: v4(), entry: [] }]);
    }

    useEffect(() => {
        headers.setObject(props);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

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
                setProps(prop => ({ ...prop, ...o }));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let entries = Object.entries(historySaver.defaultObject.headers);
        console.log(entries);
        if (entries.length > 0) {
            entries.forEach(data => {
                setFields([{ id: v4(), entry: [data[0], data[1]] }]);
            });
        } else {
            setFields([{ id: v4(), entry: ["", ""] }]);
        }
    }, [historySaver.defaultObject]);

    return (
        <>
            <form
                className="slide Header"
                id="config-header-slide"
                ref={formRef}>
                <h2>HTTP Headers</h2>
                {fields.map(field => (
                    <HeaderInput
                        key={field.id}
                        formRef={formRef}
                        placeHolderNames={["header", "value"]}
                        defaultValue={field.entry}
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
