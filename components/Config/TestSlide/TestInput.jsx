import { useState } from "react";
import SelectButton from "./SelectButton";

export default function TestInput({
    k,
    removeField,
    parentForm,
    placeHolderNames,
    allHeaders,
}) {
    const [key, setKey] = useState({ label: "", value: "" });
    const [stop, setStop] = useState(false);
    return (
        <div className="input-place">
            <input
                type="checkbox"
                defaultChecked
                onChange={(e) => {
                    setStop(!e.target.checked);
                }}
            />
            <SelectButton
                allHeaders={allHeaders}
                placeholder={placeHolderNames[0]}
                onInput={(e) => {
                    setKey(e.target.value);
                }}
            />
            <select name="operation">
                <option value="" selected disabled hidden>
                    Operation
                </option>
                <option value="equal">Equal</option>
                <option value="not-equal">Not Equal</option>
                <option value="count">Count</option>
                <option value="<=">&lt;=</option>
                <option value=">=">&gt;=</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
            </select>
            <input
                type="text"
                name={key}
                placeholder={placeHolderNames[1]}
                form={stop ? "noId" : parentForm}
            />
            <button
                type="button"
                onClick={() => {
                    removeField(k, key);
                }}
            >
                &times;
            </button>
        </div>
    );
}
