import { useEffect, useRef, useState } from "react";

export default function SelectButton({ allHeaders, ...rest }) {
    const [first, setFirst] = useState();
    const inputRef = useRef();
    const optionsRef = useRef();
    const tdRef = useRef();

    useEffect(() => {
        let input = inputRef.current;
        let options = optionsRef.current;
        let td = tdRef.current;

        input.addEventListener("blur", () => {
            td.style.display = "none";
            setTimeout(() => {
                options.style.display = "none";
            }, 500);
        });

        input.addEventListener("input", (e) => {
            let value = e.target.value.toUpperCase();
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
            blocks.forEach((block) => {
                block.addEventListener("click", () => {
                    input.value = block.textContent;
                    input.dispatchEvent(
                        new Event("input", {
                            bubbles: true,
                            target: { value: input.value },
                        })
                    );
                    options.style.display = "none";
                    td.textContent = block.dataset.text;
                    td.style.display = "block";
                    input.focus();
                    blocks.forEach((b) => {
                        b.classList.remove("block");
                    });
                });
            });
        });
    }, []);

    return (
        <div className="select-container">
            <input type="text" name={first} ref={inputRef} {...rest} />
            <div className="options" ref={optionsRef}>
                {allHeaders.map((el) => (
                    <div
                        key={el.label}
                        className="option"
                        data-text={`${el.description}`}
                    >
                        {el.label}
                    </div>
                ))}
            </div>
            <div className="tooltip-description" ref={tdRef}></div>
        </div>
    );
}
