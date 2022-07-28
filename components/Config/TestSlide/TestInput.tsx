import { useEffect, useRef, useState } from "react";
import SelectButton from "./SelectButton";
import SelectButtonValue from "./SelectButtonValue";
import mimes from "@utils/mime.json";
import statuses from "@utils/status.json";
import Checkbox from "components/Checkbox";
import { FiDelete } from "react-icons/fi";
import { useEnvironment } from "@utils/Env";
import ReactTooltip from "react-tooltip";
import { defineTooltip } from "@utils/utils";

export default function TestInput({
    formRef,
    placeHolderNames,
    removeField,
    keyName,
    defaultChecked,
    entry,
}) {
    const inputPlaceRef = useRef(null);
    const [sectionValueParent, setSectionValueParent] = useState("");
    const [allHeaders, setAllHeaders] = useState([]);
    const [tooltipTextForField, setTooltipTextForField] = useState("");
    const [tooltipTextForValue, setTooltipTextForValue] = useState("");
    const environment = useEnvironment();

    useEffect(() => {
        ReactTooltip.rebuild();
    }, []);

    useEffect(() => {
        if (sectionValueParent === "") {
            setAllHeaders([]);
        } else if (
            sectionValueParent === "Headers" ||
            sectionValueParent === "Content-Type"
        ) {
            setAllHeaders(mimes);
        } else if (sectionValueParent === "Response-Code") {
            setAllHeaders(statuses);
        } else if (sectionValueParent === "Json-Query") {
            setAllHeaders(statuses);
        } else {
            setAllHeaders([]);
        }
    }, [sectionValueParent]);

    return (
        <div className="input-place" ref={inputPlaceRef}>
            <Checkbox
                type="checkbox"
                defaultChecked={defaultChecked || false}
            />
            <SelectButton
                setSectionValueParent={setSectionValueParent}
                defaultValue={entry.key}
                data-html={true}
                data-place="top"
                data-tip={tooltipTextForField}
                optionDefaultValue={
                    entry.section === "" ? entry.key : entry.section
                }
                isInputDisabled={
                    !["Headers", "Json-Query"].includes(entry.section)
                }
                onInput={e => {
                    let value = (e.target as HTMLInputElement).value;
                    defineTooltip(value, environment, setTooltipTextForField);
                }}
            />
            <select name="operation" defaultValue={entry.operation}>
                <option value="equals to">Equal</option>
                <option value="not equals to">Not Equal</option>
                <option value="count">Count</option>
                <option value="contains">Contains</option>
                <option value="matched regex expression">Regex</option>
                <option value="type of">TypeOf</option>
                <option value="is less than or equal">&lt;=</option>
                <option value="is greater than or equal">&gt;=</option>
                <option value="is greater than">&lt;</option>
                <option value="is less than">&gt;</option>
            </select>
            <SelectButtonValue
                allProps={allHeaders}
                placeholder={placeHolderNames[1]}
                defaultValue={entry.value}
                data-html={true}
                data-place="top"
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
                        (formRef.current as HTMLFormElement).dispatchEvent(
                            new Event("input", {
                                bubbles: true,
                            })
                        );
                    }, 200);
                }}>
                <FiDelete />
            </button>
        </div>
    );
}
