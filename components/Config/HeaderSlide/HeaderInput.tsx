import { useState, useRef } from "react";
import SelectHeaderButton from "./SelectHeaderButton";
import allHeaders from "@utils/data.json";
import Checkbox from "components/Checkbox";
import { FiDelete } from "react-icons/fi";

export default function HeaderInput({
    formRef,
    placeHolderNames,
    defaultValue,
    keyName,
    removeField,
    defaultChecked = false,
}) {
    const [key, setKey] = useState("");
    const inputPlaceRef = useRef(null);
    const [hasInput, setHasInput] = useState(defaultChecked);

    return (
        <div className="input-place" ref={inputPlaceRef}>
            <Checkbox
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
                    }, 100);
                }}>
                <FiDelete />
            </button>
        </div>
    );
}
