import { useState, useRef } from "react";
import SelectHeaderButton from "./SelectHeaderButton";
import allHeaders from "../../../utils/data.json";

export default function HeaderInput({ formRef, placeHolderNames }) {
    const [key, setKey] = useState("");
    const inputPlaceRef = useRef(null);

    return (
        <div className="input-place" ref={inputPlaceRef}>
            <input type="checkbox" defaultChecked />
            <SelectHeaderButton
                allHeaders={allHeaders}
                placeholder={placeHolderNames[0]}
                onInput={(e) => {
                    setKey(e.target.value);
                }}
            />
            <input type="text" name={key} placeholder={placeHolderNames[1]} />
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
