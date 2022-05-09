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
    const [urlDataParams, setUrlDataParams] = useState([]);

    useEffect(() => {
        setUrlDataParams(Object.entries(urlData.urlParams));
    }, [urlData]);

    useEffect(() => {
        setObject(props);
        let search = `${urlData.baseURL}?${new URLSearchParams(
            props
        ).toString()}`;
        urlData.setObject((prev) => ({
            ...prev,
            url: search,
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
                setProps((prop) => ({ ...prop, ...o }));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [fields, setFields] = useState([v4()]);

    // useEffect(() => {
    //     console.log(param);
    // }, [param]);

    function addField() {
        setFields([...fields, v4()]);
    }

    return (
        <>
            <form
                className="slide Query slide-selected"
                id="config-query-slide"
                ref={formRef}
            >
                <h2>Query Parameters</h2>
                {urlDataParams.map((data) => (
                    <InputPlace
                        key={data[0]}
                        formRef={formRef}
                        placeHolderNames={["parameter", "value"]}
                        defaultValue={[data[0], data[1]]}
                        defaultChecked={true}
                    />
                ))}
                {fields.map((field) => (
                    <InputPlace
                        key={field}
                        formRef={formRef}
                        placeHolderNames={["parameter", "value"]}
                        defaultValue={[]}
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
