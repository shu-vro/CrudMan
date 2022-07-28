import { useState, useRef, useEffect } from "react";
import SelectHeaderButton from "./SelectHeaderButton";
import allHeaders from "@utils/data.json";
import Checkbox from "components/Checkbox";
import { FiDelete } from "react-icons/fi";
import { useEnvironment } from "@utils/Env";
import ReactTooltip from "react-tooltip";
import { defineTooltip } from "@utils/utils";

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
    const [tooltipTextForField, setTooltipTextForField] = useState("");
    const [tooltipTextForValue, setTooltipTextForValue] = useState("");
    const environment = useEnvironment();

    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);

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
                data-html={true}
                data-place="top"
                data-tip={tooltipTextForField}
                onInput={e => {
                    let value = (e.target as HTMLInputElement).value;
                    defineTooltip(value, environment, setTooltipTextForField);
                    setKey(value);
                    if (value !== "") {
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
                data-html={true}
                data-place="bottom"
                data-tip={tooltipTextForValue}
                onInput={e => {
                    let value = (e.target as HTMLInputElement).value;
                    defineTooltip(value, environment, setTooltipTextForValue);
                }}
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
