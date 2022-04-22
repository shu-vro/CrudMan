import { useState } from "react";

export default function InputPlace({
    k,
    removeField,
    parentForm,
    placeHolderNames,
}) {
    const [key, setKey] = useState("");
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
            <input
                type="text"
                placeholder={placeHolderNames[0]}
                onInput={(e) => {
                    setKey(e.target.value);
                }}
                name={key}
                form={stop ? "noId" : parentForm}
            />
            <input
                type="text"
                name={key}
                placeholder={placeHolderNames[1]}
                form={stop ? "noId" : "config-query-slide"}
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
