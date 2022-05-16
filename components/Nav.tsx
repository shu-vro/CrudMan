import { useRef, useEffect } from "react";
import styles from "../css/App.module.scss";
import { useTheme } from "../utils/Theme";

export default function Nav() {
    let logoRef = useRef();
    let themeManager = useTheme();

    useEffect(() => {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem(
                "theme",
                !window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "light"
                    : "dark"
            );
        }
        themeManager.setValue(localStorage.getItem("theme"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        console.log(themeManager);
        document.body.className = localStorage.getItem("theme");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeManager]);

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
                        themeManager.setValue(localStorage.getItem("theme"));
                    }
                }}
            >
                <path
                    d="M54.999602,1.880388L456.999861,0q53.630787,1.880388,53.630787,56.879989q0,34.355429,0,393.636192Q510.630648,512,456.999861,512q-8.393102,0-412.564452,1.880388Q-0.00051,503.920834,0.000139,457q0-46.194972,44.43527-55.999999h265.683816q40.754822-.115995,44-45t-44.000088-44.884006L158.244392,311q-55.00011-2.121744-55.00011-53.119612t55.00011-56.880386l151.874833-.115997q41.836547-.277112,44-37.931344c2.163453-37.654232-12.503243-48.13152-44.000088-49.952661h-265.683728Q0.000139,99.962557,-0.00051,58.760377Q0.000139,13.693501,54.999602,1.880388Z"
                    transform="translate(.000002 0)"
                    fill="#3096ff"
                    strokeWidth="1.024"
                />
            </svg>

            <h1>
                CRUD<span>MAN</span>
            </h1>
        </nav>
    );
}
