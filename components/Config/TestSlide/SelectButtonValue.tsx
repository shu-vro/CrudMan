import { useEffect, useRef } from "react";

interface eventInitDictParams {
    bubbles: boolean;
    target: {
        value: string;
    };
}

export default function SelectHeaderButton({ allProps, ...rest }) {
    const inputRef = useRef();
    const optionsRef = useRef();
    const tipRef = useRef();

    useEffect(() => {
        let input: HTMLInputElement = inputRef.current;
        let options: HTMLDivElement = optionsRef.current;
        let tip: HTMLTableDataCellElement = tipRef.current;

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
                lists.forEach((list: HTMLElement, i: Number) => {
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
                let eventInitDict: eventInitDictParams = {
                    bubbles: true,
                    target: { value: input.value },
                };
                input.dispatchEvent(new Event("input", eventInitDict));
                options.style.display = "none";
                tip.textContent = (lists?.[selectedIndex]).dataset.text;
                tip.style.display = "block";
                input.focus();
                lists.forEach(b => {
                    b.classList.remove("block");
                });
            }
        });
    }, []);

    return (
        <div className="select-container">
            <input type="text" ref={inputRef} {...rest} />
            <div className="options" ref={optionsRef}>
                {allProps.map(el => (
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
