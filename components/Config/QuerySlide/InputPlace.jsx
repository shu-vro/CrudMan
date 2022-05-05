import { useState, useRef } from "react";

export default function InputPlace({
    formRef,
    placeHolderNames,
    defaultValue,
}) {
    const [key, setKey] = useState("");
    const inputPlaceRef = useRef(null);

    return (
        <div className="input-place" ref={inputPlaceRef}>
            <input type="checkbox" defaultChecked />
            <input
                type="text"
                placeholder={placeHolderNames[0]}
                onInput={(e) => {
                    setKey(e.target.value);
                }}
                name={key}
                defaultValue={defaultValue[0]}
            />
            <input
                type="text"
                name={key}
                placeholder={placeHolderNames[1]}
                defaultValue={defaultValue[1]}
            />
            <button
                type="button"
                onClick={() => {
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
