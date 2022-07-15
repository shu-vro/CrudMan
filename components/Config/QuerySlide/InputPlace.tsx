import Checkbox from "components/Checkbox";
import { useState, useRef } from "react";
import { FiDelete } from "react-icons/fi";

export default function InputPlace({
    keyName,
    formRef,
    placeHolderNames,
    defaultValue,
    removeField,
    defaultChecked = false,
}) {
    const [key, setKey] = useState("");
    const [hasInput, setHasInput] = useState(defaultChecked);
    const inputPlaceRef = useRef(null);

    return (
        <div className="input-place" ref={inputPlaceRef}>
            <Checkbox
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
                    if ((e.target as HTMLInputElement).value !== "") {
                        setHasInput(true);
                        setTimeout(() => {
                            formRef.current?.dispatchEvent(
                                new Event("input", {
                                    bubbles: true,
                                })
                            );
                        }, 0);
                    } else {
                        setHasInput(false);
                        setTimeout(() => {
                            formRef.current?.dispatchEvent(
                                new Event("input", {
                                    bubbles: true,
                                })
                            );
                        }, 0);
                    }
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
                    }, 100);
                }}>
                <FiDelete />
            </button>
        </div>
    );
}
