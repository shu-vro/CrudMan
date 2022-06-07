import { useState, useRef } from "react";

export default function InputPlace({
    formRef,
    placeHolderNames,
    defaultValue,
}) {
    const [key, setKey] = useState("");
    const [hasInput, setHasInput] = useState(false);
    const inputPlaceRef = useRef(null);

    return (
        <div className="input-place" ref={inputPlaceRef}>
            <input type="checkbox" defaultChecked={hasInput} />
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
                defaultValue={defaultValue[0]}
                onChange={() => true}
            />
            <input
                type="text"
                name={key}
                placeholder={placeHolderNames[1]}
                defaultValue={defaultValue[1]}
                onChange={() => true}
            />
            <button
                type="button"
                onClick={() => {
                    inputPlaceRef.current.remove();

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
