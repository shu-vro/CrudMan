import { useEffect, useRef, useState } from "react";
import SelectButton from "./SelectButton";
import SelectButtonValue from "./SelectButtonValue";
import mimes from "@utils/mime.json";
import statuses from "@utils/status.json";

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
            <input type="checkbox" defaultChecked={defaultChecked || false} />
            <SelectButton
                setSectionValueParent={setSectionValueParent}
                defaultValue={entry.key}
                optionDefaultValue={
                    entry.section === "" ? entry.key : entry.section
                }
                isInputDisabled={
                    !["Headers", "Json-Query"].includes(entry.section)
                }
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
                    }, 500);
                }}>
                &times;
            </button>
        </div>
    );
}
