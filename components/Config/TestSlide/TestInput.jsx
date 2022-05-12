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
                <option value="equals to">Equal</option>
                <option value="not equals to">Not Equal</option>
                <option value="count">Count</option>
                <option value="contains">Contains</option>
                <option value="is less than or equal">&lt;=</option>
                <option value="is greater than or equal">&gt;=</option>
                <option value="is greater than">&lt;</option>
                <option value="is less than">&gt;</option>
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
