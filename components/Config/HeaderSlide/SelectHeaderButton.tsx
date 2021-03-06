import { useEffect, useRef } from "react";
import styles from "@styles/App.module.scss";

export default function SelectHeaderButton({ allHeaders, ...rest }) {
    const inputRef = useRef();
    const optionsRef = useRef();
    const tipRef = useRef();

    useEffect(() => {
        let input: HTMLInputElement = inputRef.current;
        let options: HTMLDivElement = optionsRef.current;
        let tip: HTMLTableDataCellElement = tipRef.current;

        input.addEventListener("blur", () => {
            tip.style.display = "none";
            setTimeout(() => {
                options.style.display = "none";
            }, 500);
        });

        input.addEventListener("input", e => {
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
                    tip.textContent = block.dataset.text;
                    tip.style.display = "block";
                    input.focus();
                    blocks.forEach(b => {
                        b.classList.remove("block");
                    });
                });
            });
        });
    }, []);

    return (
        <div className="select-container">
            <input type="text" ref={inputRef} {...rest} />
            <div className="options" ref={optionsRef}>
                {allHeaders.map(el => (
                    <div
                        key={el.label}
                        className="option"
                        data-text={`${el.description}`}>
                        {el.label}
                    </div>
                ))}
            </div>
            <div className="tooltip-description" ref={tipRef}></div>
        </div>
    );
}
