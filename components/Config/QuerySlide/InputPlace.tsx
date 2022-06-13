import { useState, useRef } from "react";

export default function InputPlace({
    keyName,
    formRef,
    placeHolderNames,
    defaultValue,
    removeField,
    defaultChecked,
}) {
    const [key, setKey] = useState("");
    const [hasInput, setHasInput] = useState(defaultChecked || false);
    const inputPlaceRef = useRef(null);

    return (
        <div className="input-place" ref={inputPlaceRef}>
            <input
                type="checkbox"
                checked={hasInput}
                onChange={() => {
                    setHasInput(!hasInput);
                }}
            />
            <input
                type="text"
                placeholder={placeHolderNames[0]}
                onInput={e => {
                    setKey((e.target as HTMLInputElement).value);
                    if ((e.target as HTMLInputElement).value !== "")
                        setHasInput(true);
                    else setHasInput(false);
                }}
                name={key}
                defaultValue={defaultValue?.[0]}
                onChange={() => true}
            />
            <input
                type="text"
                name={key}
                placeholder={placeHolderNames[1]}
                defaultValue={defaultValue?.[1]}
                onChange={() => true}
            />
            <button
                type="button"
                onClick={() => {
                    removeField(keyName);

                    setTimeout(() => {
                        formRef.current?.dispatchEvent(
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
