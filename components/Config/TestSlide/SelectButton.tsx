import { useEffect, useRef, useState } from "react";
import allHeaders from "@utils/data.json";

interface eventInitDictParams {
    bubbles: boolean;
    target: {
        value: string;
    };
}

export default function SelectButton({
    setSectionValueParent,
    optionDefaultValue,
    isInputDisabled = true,
    ...rest
}) {
    const inputRef = useRef();
    const optionsRef = useRef();
    const tipRef = useRef();
    const sectionRef = useRef();
    const [sectionValue, setSectionValue] = useState("Select");
    const [allParams, setAllParams] = useState([]);
    const [inputDisabled, setInputDisabled] = useState(isInputDisabled);

    useEffect(() => {
        let input: HTMLInputElement = inputRef.current;
        let options: HTMLDivElement = optionsRef.current;
        let tip: HTMLTableDataCellElement = tipRef.current;
        let section: HTMLSelectElement = sectionRef.current;

        let selectedIndex = 0;

        input.addEventListener("blur", () => {
            tip.style.display = "none";
            setTimeout(() => {
                options.style.display = "none";
            }, 500);
        });

        input.addEventListener("input", e => {
            let value = input.value.toUpperCase();
            selectedIndex = 0;
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
            let blocks = options.querySelectorAll(".option.block");
            focus(0, blocks);
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
                    tip.textContent = block.dataset.text;
                    tip.style.display = "block";
                    input.focus();
                    blocks.forEach(b => {
                        b.classList.remove("block");
                    });
                });
            });
        });
        function focus(index: number, lists: NodeListOf<Element>) {
            if (lists.length === 0) return;
            if (index > -1 && index < lists.length) {
                let top = 0;
                lists.forEach((list: HTMLElement, i: number) => {
                    if (i < index) {
                        top += list.getBoundingClientRect().height;
                    }
                    list.classList.remove("focused");
                });
                lists[index].classList.add("focused");
                options.scrollTo(0, top);
            }
        }
        input.addEventListener("keydown", e => {
            let lists: NodeListOf<HTMLDivElement> =
                options.querySelectorAll(".option.block");
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (lists.length - 1 > selectedIndex) {
                    selectedIndex++;
                } else {
                    selectedIndex = 0;
                }
                focus(selectedIndex, lists);
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (selectedIndex > 0) {
                    selectedIndex--;
                } else {
                    selectedIndex = lists.length - 1;
                }
                focus(selectedIndex, lists);
            } else if (e.key === "Enter") {
                input.value = lists?.[selectedIndex].textContent;
                input.dispatchEvent(new Event("input"));
            } else if (e.key === "Escape" && input.value === "") {
                section.selectedIndex = 0;
                setInputDisabled(prev => !prev);
                input.value = lists?.[selectedIndex]?.textContent || "";
                let eventInitDict: eventInitDictParams = {
                    bubbles: true,
                    target: { value: input.value },
                };
                input.dispatchEvent(new Event("input", eventInitDict));
                options.style.display = "none";
                tip.textContent = "";
                tip.style.display = "block";
                input.focus();
                lists.forEach(b => {
                    b.classList.remove("block");
                });
            }
        });
    }, [setSectionValueParent]);

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
                className={!inputDisabled ? "hidden" : ""}
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
                data-tip="Escape button for more categories. (on focused empty input)"
                hidden={inputDisabled}
                {...rest}
            />
            <div className="options" ref={optionsRef}>
                {allParams.map((el: { label: string; description: string }) => (
                    <div
                        key={el.label.toLowerCase()}
                        className="option"
                        data-text={`${el.description}`}>
                        {el.label.toLowerCase()}
                    </div>
                ))}
            </div>
            <div className="tooltip-description" ref={tipRef}></div>
        </div>
    );
}
