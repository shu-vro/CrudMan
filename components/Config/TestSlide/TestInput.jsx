import { useState, useRef } from "react";
import SelectButton from "./SelectButton";

export default function TestInput({ formRef, placeHolderNames, allHeaders }) {
    const [key, setKey] = useState({ label: "", value: "" });
    const inputPlaceRef = useRef(null);
    return (
        <div className="input-place" ref={inputPlaceRef}>
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
                <option value="contains">Contains</option>
                <option value="<=">&lt;=</option>
                <option value=">=">&gt;=</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
            </select>
            <input type="text" name={key} placeholder={placeHolderNames[1]} />
            <button
                type="button"
                onClick={(e) => {
                    inputPlaceRef.current.remove();
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
