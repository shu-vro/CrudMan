import React from "react";

export default function Test() {
    const d = React.useRef(null);
    const [value, setValue] = React.useState("");
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
                        "<span class='env'>$&</span>"
                    );
                    p.innerHTML = n;
                    setValue(p.textContent);
                    setTimeout(() => {
                        d.current.focus();
                    }, 0);
                }}>
                Hello world!
            </div>
        </>
    );
}
