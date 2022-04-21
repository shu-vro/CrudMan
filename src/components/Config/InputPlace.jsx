import { useState } from "react";

export default function InputPlace({
    k,
    removeField,
    enableField,
    disableField,
}) {
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [stop, setStop] = useState(false);

    return (
        <div className="input-place">
            <input
                type="checkbox"
                defaultChecked
                onChange={(e) => {
                    e.stopPropagation();
                    if (!e.target.checked) disableField(key);
                    else enableField(key, value);
                    setStop(!e.target.checked);
                    console.log(e.target.checked, stop);
                }}
            />
            <input
                type="text"
                placeholder="key"
                onInput={(e) => {
                    setKey(e.target.value);
                }}
                name={key}
                disabled={stop}
            />
            <input
                type="text"
                name={key}
                placeholder="value"
                onInput={(e) => {
                    setValue(e.target.value);
                }}
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
