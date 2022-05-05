import { useState } from "react";

export default function InputPlace({
    k,
    removeField,
    formRef,
    placeHolderNames,
}) {
    const [key, setKey] = useState("");

    return (
        <div className="input-place">
            <input
                type="checkbox"
                defaultChecked
                onChange={(e) => {
                    setStop(!e.target.checked);
                }}
            />
            <input
                type="text"
                placeholder={placeHolderNames[0]}
                onInput={(e) => {
                    setKey(e.target.value);
                }}
                name={key}
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
