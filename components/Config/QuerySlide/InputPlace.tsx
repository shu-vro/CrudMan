import { useEffect } from "react";
import { useState, useRef } from "react";
import { FiDelete } from "react-icons/fi";
import { TbGripVertical } from "react-icons/tb";
import ReactTooltip from "react-tooltip";
import { useEnvironment } from "@utils/Env";
import { defineTooltip } from "@utils/utils";
import Checkbox from "components/Checkbox";

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
    const [tooltipTextForField, setTooltipTextForField] = useState("");
    const [tooltipTextForValue, setTooltipTextForValue] = useState("");
    const environment = useEnvironment();

    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);

    return (
        <div className="input-place" ref={inputPlaceRef}>
            <TbGripVertical className="handle" />
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
                data-html={true}
                data-place="bottom"
                data-tip={tooltipTextForField}
                style={{
                    width: "35%",
                }}
                onInput={e => {
                    let value = (e.target as HTMLInputElement).value;
                    setKey(value);
                    defineTooltip(value, environment, setTooltipTextForField);
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
                name={key}
                defaultValue={defaultValue?.[0]}
                onChange={() => true}
            />
            <input
                type="text"
                name={key}
                placeholder={placeHolderNames[1]}
                defaultValue={defaultValue?.[1]}
                data-html={true}
                data-place="bottom"
                data-tip={tooltipTextForValue}
                style={{
                    width: "35%",
                }}
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
