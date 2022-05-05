import { useState } from "react";
import SelectButton from "../TestSlide/SelectButton";
import allHeaders from "../../../utils/data.json";

export default function HeaderInput({
    k,
    removeField,
    formRef,
    placeHolderNames,
}) {
    const [key, setKey] = useState("");

    return (
        <div className="input-place">
            <input type="checkbox" defaultChecked />
            <SelectButton
                allHeaders={allHeaders}
                placeholder={placeHolderNames[0]}
                onInput={(e) => {
                    setKey(e.target.value);
                }}
            />
            <input type="text" name={key} placeholder={placeHolderNames[1]} />
            <button
                type="button"
                onClick={() => {
                    removeField(k, key);

                    setTimeout(() => {
                        formRef.current.dispatchEvent(
                            new Event("input", {
                                bubbles: true,
                            })
                        );
                    }, 500);
                }}
            >
                &times;
            </button>
        </div>
    );
}
