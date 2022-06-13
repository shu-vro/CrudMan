import { useEffect, useRef, useState } from "react";
import allHeaders from "../../../utils/data.json";

export default function SelectButton({
    setSectionValueParent,
    optionDefaultValue,
    ...rest
}) {
    const inputRef = useRef();
    const optionsRef = useRef();
    const tdRef = useRef();
    const sectionRef = useRef();
    const [sectionValue, setSectionValue] = useState("");
    const [allParams, setAllParams] = useState([]);
    const [inputDisabled, setInputDisabled] = useState(true);

    useEffect(() => {
        let input: HTMLInputElement = inputRef.current;
        let options: HTMLDivElement = optionsRef.current;
        let td: HTMLTableDataCellElement = tdRef.current;

        input.addEventListener("blur", () => {
            td.style.display = "none";
            setTimeout(() => {
                options.style.display = "none";
            }, 500);
        });

        input.addEventListener("keydown", e => {
            if (e.key === "Escape" && input.value === "") {
                setInputDisabled(prev => !prev);
            }
        });

        input.addEventListener("input", () => {
            let value = input.value.toUpperCase();
            if (value === "") {
                options.style.display = "none";
                return;
            } else {
                options.style.display = "block";
            }
            let lists = options.querySelectorAll(".option");

            for (let i = 0; i < lists.length; i++) {
                const element = lists[i];
                if (element.textContent.toUpperCase().indexOf(value) > -1) {
                    element.classList.add("block");
                    element.classList.remove("none");
                } else {
                    element.classList.add("none");
                    element.classList.remove("block");
                }
            }
            let blocks = options.querySelectorAll(".block");
            blocks.forEach((block: HTMLElement) => {
                block.addEventListener("click", () => {
                    input.value = block.textContent;
                    interface eventInitDictParams {
                        bubbles: boolean;
                        target: {
                            value: string;
                        };
                    }
                    let eventInitDict: eventInitDictParams = {
                        bubbles: true,
                        target: { value: input.value },
                    };
                    input.dispatchEvent(new Event("input", eventInitDict));
                    options.style.display = "none";
                    td.textContent = block.dataset.text;
                    td.style.display = "block";
                    input.focus();
                    blocks.forEach(b => {
                        b.classList.remove("block");
                    });
                });
            });
        });
    }, []);

    useEffect(() => {
        let select: HTMLSelectElement = sectionRef.current;
        let input: HTMLInputElement = inputRef.current;
        select.addEventListener("change", () => {
            let value = select.value;
            let params = [];
            if (value === "Headers") {
                params = allHeaders;
            } else {
                params = [];
            }
            setAllParams(params);

            if (["Headers", "Json-Query"].find(option => option === value)) {
                value === "Json-Query"
                    ? (input.value = "json.")
                    : (input.value = "");
                setInputDisabled(false);
            } else {
                input.value = value;
                setInputDisabled(true);
            }
        });
    }, []);

    return (
        <div className="select-container">
            <select
                ref={sectionRef}
                hidden={!inputDisabled}
                defaultValue={optionDefaultValue}
                onChange={e => {
                    setSectionValue(e.target.value);
                    setSectionValueParent(e.target.value);
                }}>
                <option value="" defaultChecked>
                    Select
                </option>
                <option value="Headers">Headers</option>
                <option value="Response-Code">Response-Code</option>
                <option value="Response-Body">Response-Body</option>
                <option value="Response-Time">Response-Time</option>
                <option value="Content-Length">Content-Length</option>
                <option value="Content-Type">Content-Type</option>
                <option value="Json-Query">Json-Query</option>
            </select>
            <input
                type="text"
                ref={inputRef}
                placeholder={"Test " + sectionValue}
                title="Escape button for more categories."
                hidden={inputDisabled}
                {...rest}
            />
            <div className="options" ref={optionsRef}>
                {allParams.map((el: { label: string; description: string }) => (
                    <div
                        key={el.label}
                        className="option"
                        data-text={`${el.description}`}>
                        {el.label}
                    </div>
                ))}
            </div>
            <div className="tooltip-description" ref={tdRef}></div>
        </div>
    );
}
