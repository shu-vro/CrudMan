import { useState, useRef } from "react";
import SelectHeaderButton from "./SelectHeaderButton";
import allHeaders from "../../../utils/data.json";

export default function HeaderInput({
    formRef,
    placeHolderNames,
    defaultValue,
    keyName,
    removeField,
    defaultChecked,
}) {
    const [key, setKey] = useState("");
    const inputPlaceRef = useRef(null);
    const [hasInput, setHasInput] = useState(defaultChecked || false);

    return (
        <div className="input-place" ref={inputPlaceRef}>
            <input
                type="checkbox"
                checked={hasInput}
                onChange={() => {
                    setHasInput(!hasInput);
                }}
            />
            <SelectHeaderButton
                allHeaders={allHeaders}
                placeholder={placeHolderNames[0]}
                defaultValue={defaultValue?.[0]}
                onInput={e => {
                    setKey((e.target as HTMLInputElement).value);
                    if ((e.target as HTMLInputElement).value !== "")
                        setHasInput(true);
                    else setHasInput(false);
                }}
            />
            <input
                type="text"
                name={key}
                placeholder={placeHolderNames[1]}
                defaultValue={defaultValue?.[1]}
            />
            <button
                type="button"
                onClick={() => {
                    removeField(keyName);
                    setTimeout(() => {
                        formRef.current.dispatchEvent(
                            new Event("input", {
                                bubbles: true,
                            })
                        );
                    }, 500);
                }}>
                &times;
            </button>
        </div>
    );
}
