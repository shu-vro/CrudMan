import React from "react";

export default function Test() {
    const d = React.useRef<HTMLDivElement>();
    const [value, setValue] = React.useState("");
    let a = `{{hi}}`;
    return (
        <>
            <div
                style={{
                    WebkitUserModify: "read-write",
                }}
                ref={d}
                spellCheck={false}
                placeholder="Enter URL"
                onInput={e => {
                    let p = e.target as HTMLDivElement;
                    let n = p.textContent.replaceAll(
                        /{{.*\w}}/g,
                        "<mark>$&</mark>"
                    );
                    p.innerHTML = n;
                    setValue(p.textContent);
                    setTimeout(() => {
                        d.current.focus();
                    }, 0);
                }}>
                Hello world! {a}
            </div>
        </>
    );
}
