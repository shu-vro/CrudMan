import { useState } from "react";
import SelectButton from "./SelectButton";

export default function TestInput({
    k,
    removeField,
    formRef,
    placeHolderNames,
    allHeaders,
}) {
    const [key, setKey] = useState({ label: "", value: "" });
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
            <select name="operation">
                <option value="equal">Equal</option>
                <option value="not-equal">Not Equal</option>
                <option value="count">Count</option>
                <option value="<=">&lt;=</option>
                <option value=">=">&gt;=</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
            </select>
            <input type="text" name={key} placeholder={placeHolderNames[1]} />
            <button
                type="button"
                onClick={(e) => {
                    removeField(k, key);
                    formRef.current.dispatchEvent(
                        new Event("input", {
                            bubbles: true,
                        })
                    );
                }}
            >
                &times;
            </button>
        </div>
    );
}
