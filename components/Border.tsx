import { useEffect, useRef } from "react";
import styles from "../css/App.module.scss";

export default function Border() {
    const borderRef = useRef(null);
    useEffect(() => {
        var border: HTMLSpanElement = borderRef.current;

        var configSlide: HTMLDivElement = document.querySelector(
            `.${styles.config}`
        );
        var resultsSlide: HTMLDivElement = document.querySelector(
            `.${styles.results}`
        );

        let mouseDown = false;

        border.addEventListener("touchstart", () => {
            mouseDown = true;
        });
        border.addEventListener("mousedown", () => {
            mouseDown = true;
        });
        border.addEventListener("touchmove", move);
        border.addEventListener("mousemove", move);

        function move(e) {
            if (mouseDown) {
                let configSlide: HTMLDivElement = document.querySelector(
                    `.${styles.config}`
                );
                let resultsSlide: HTMLDivElement = document.querySelector(
                    `.${styles.results}`
                );

                let width = (getPositionX(e) / window.innerWidth) * 100;
                // configSlide.style.width = `${width}%`;
                // resultsSlide.style.width = `${100 - width}%`;
                configSlide.style.setProperty("--w", `${width}%`);
                resultsSlide.style.setProperty("--w", `${100 - width}%`);
                border.style.setProperty("--r", `${width}%`);
            }
        }

        window.addEventListener("resize", () => {
            if (window.matchMedia(`(max-width: 786px)`).matches) {
                configSlide.style.setProperty("--w", `100%`);
                resultsSlide.style.setProperty("--w", `100%`);
            }
        });

        border.addEventListener("touchend", () => {
            mouseDown = false;
        });
        border.addEventListener("mouseleave", () => {
            mouseDown = false;
        });
        border.addEventListener("mouseup", () => {
            mouseDown = false;
        });

        // get mouse x position based on touch or mouse
        function getPositionX(e: MouseEvent | TouchEvent) {
            return e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
        }
    }, []);

    return (
        <span className="border" ref={borderRef} style={{ "--r": "50%" }}>
            &nbsp;
        </span>
    );
}
