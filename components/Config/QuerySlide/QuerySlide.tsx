import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { useHistorySaver } from "@utils/HistorySaver";
import { useParams } from "@utils/Params";
import { useUrlData } from "@utils/UrlData";
import InputPlace from "./InputPlace";

export default function QuerySlide() {
    const formRef = useRef(null);
    let param = useParams();
    let urlData = useUrlData();
    let historySaver = useHistorySaver();
    const [props, setProps] = useState({});

    type FieldsType = Array<{
        id: string;
        entry?: [string?, any?];
        defaultChecked?: boolean;
    }>;
    const [fields, setFields] = useState<FieldsType>([
        { id: v4(), entry: ["", ""] },
    ]);

    function addField() {
        setFields([...fields, { id: v4(), entry: [] }]);
    }

    function removeField(keyName: string) {
        setFields(prev => prev.filter(field => field.id !== keyName));
    }

    /*
    These lines should be in historySaver file, but due to bugs, we are migrating these codes in here!
    */
    useEffect(() => {
        if (!localStorage.getItem("history")) {
            localStorage.setItem("history", JSON.stringify([]));
            return;
        }
        historySaver.setObject(
            JSON.parse(localStorage.getItem("history") || "[]")
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        historySaver.object.length > 0 &&
            localStorage.setItem(
                "history",
                JSON.stringify(historySaver.object)
            );
    }, [historySaver.object]);

    useEffect(() => {
        let entries = Object.entries(historySaver.defaultObject.params);
        setFields([]);
        if (entries.length > 0) {
            entries.forEach(data => {
                setFields(prev => [
                    ...prev,
                    {
                        id: v4(),
                        entry: [data[0], data[1]],
                        defaultChecked: true,
                    },
                ]);
            });
        } else {
            setFields([{ id: v4(), entry: ["", ""] }]);
        }
        setTimeout(() => {
            formRef.current?.dispatchEvent(
                new Event("input", {
                    bubbles: true,
                })
            );
        }, 500);
    }, [historySaver.defaultObject]);

    useEffect(() => {
        param.setObject(props);
        urlData.setObject(prev => ({
            ...prev,
            urlParams: props,
        }));
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
                let key = place.childNodes[1].value;
                let value = place.childNodes[2].value;
                let o = {
                    [key]: value,
                };
                setProps(prop => ({ ...prop, ...o }));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <form
                className="slide Query slide-selected"
                id="config-query-slide"
                ref={formRef}>
                <h2>Query Parameters</h2>
                {/* {urlDataParams.map(data => (
                    <InputPlace
                        key={data[0]}
                        formRef={formRef}
                        placeHolderNames={["parameter", "value"]}
                        defaultValue={[data[0], data[1]]}
                    />
                ))} */}
                {fields.map(field => (
                    <InputPlace
                        key={field.id}
                        keyName={field.id}
                        formRef={formRef}
                        placeHolderNames={["parameter", "value"]}
                        defaultValue={field.entry}
                        removeField={removeField}
                        defaultChecked={field.defaultChecked}
                    />
                ))}

                <button
                    type="button"
                    className="add-row-button"
                    onClick={addField}>
                    + Add Row
                </button>
            </form>
        </>
    );
}
