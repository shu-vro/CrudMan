import { useRef, useEffect } from "react";
import styles from "../css/App.module.scss";
import { useTheme } from "../utils/Theme";

export default function Nav() {
    let logoRef = useRef();
    let themeManager = useTheme();
    useEffect(() => {
        function handleClick() {
            console.log("hi ");
            if (!localStorage.getItem("theme")) {
                localStorage.setItem(
                    "theme",
                    !window.matchMedia("(prefers-color-scheme: dark)").matches
                        ? "light"
                        : "dark"
                );
            } else {
                let theme = localStorage.getItem("theme");
                console.log("theme: ", theme);
                theme === "dark"
                    ? localStorage.setItem("theme", "light")
                    : localStorage.setItem("theme", "dark");

                document.body.className = localStorage.getItem("theme");
            }
        }
        // logoRef.current.addEventListener("click", handleClick);
    }, []);

    return (
        <nav className={styles.nav}>
            <svg
                id="e2ALfJdSy7v1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                width="512"
                height="512"
                ref={logoRef}
                onClick={() => {
                    console.log("hi ");
                    if (!localStorage.getItem("theme")) {
                        localStorage.setItem(
                            "theme",
                            !window.matchMedia("(prefers-color-scheme: dark)")
                                .matches
                                ? "light"
                                : "dark"
                        );
                    } else {
                        let theme = localStorage.getItem("theme");
                        theme === "dark"
                            ? localStorage.setItem("theme", "light")
                            : localStorage.setItem("theme", "dark");

                        document.body.className = localStorage.getItem("theme");
                        themeManager.setValue(localStorage.getItem("theme"));
                    }
                }}
            >
                <g transform="translate(.000002 0)">
                    <rect
                        width="504.478449"
                        height="512"
                        rx="55"
                        ry="55"
                        transform="matrix(1.014909 0 0 1 0.000141 1.880388)"
                        fill="#5a5a5a"
                        strokeWidth="0"
                    />
                    <rect
                        width="508.239225"
                        height="110"
                        rx="55"
                        ry="55"
                        transform="matrix(0 1-1 0 511.999859 3.760775)"
                        fill="var(--blue-color)"
                        strokeWidth="0"
                    />
                    <rect
                        width="508.239225"
                        height="110"
                        rx="55"
                        ry="55"
                        transform="translate(103.24479 201)"
                        fill="var(--blue-color)"
                        strokeWidth="0"
                    />
                    <rect
                        width="88.12"
                        height="88.115954"
                        rx="0"
                        ry="0"
                        transform="matrix(1.160002 0 0 1.193168 310.119225 101.634755)"
                        fill="var(--blue-color)"
                        strokeWidth="0"
                    />
                    <rect
                        width="88.12"
                        height="88.115954"
                        rx="0"
                        ry="0"
                        transform="matrix(1.160002 0 0 1.143712 310.119225 304.54834)"
                        fill="var(--blue-color)"
                        strokeWidth="0"
                    />
                    <rect
                        width="508.239225"
                        height="110"
                        rx="55"
                        ry="55"
                        transform="translate(-.000002 402)"
                        fill="var(--blue-color)"
                        strokeWidth="0"
                    />
                    <rect
                        width="508.239225"
                        height="110"
                        rx="55"
                        ry="55"
                        transform="translate(.000001 2.884046)"
                        fill="var(--blue-color)"
                        strokeWidth="0"
                    />
                </g>
                <ellipse
                    rx="60.517953"
                    ry="54.931842"
                    transform="matrix(.743581 0 0 0.819197 310.119227 356)"
                    fill="#5a5a5a"
                    strokeWidth="0"
                />
                <ellipse
                    rx="59.17311"
                    ry="53.711134"
                    transform="matrix(.743581 0 0 0.819197 310.119227 157)"
                    fill="#5a5a5a"
                    strokeWidth="0"
                />
            </svg>
            <h1>
                CRUD<span>MAN</span>
            </h1>
        </nav>
    );
}
