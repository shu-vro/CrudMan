import { useEffect, useRef } from "react";
import styles from "../css/App.module.scss";

export default function CommonSliderAssets({ children, lists, defaultCheck }) {
    let slidesRef = useRef(null);
    useEffect(() => {
        /**
         * @type {HTMLDivElement}
         */
        const slides = slidesRef.current;
        const listsEl = slides.querySelectorAll("ul li");
        const slideContainer = slides.querySelector(".slideContainer");

        listsEl.forEach((list) => {
            list.addEventListener("click", () => {
                listsEl.forEach((list) => {
                    list.classList.remove("selected");
                });
                list.classList.add("selected");
                slideContainer.querySelectorAll(".slide").forEach((child) => {
                    child.classList.remove("slide-selected");
                });
                slideContainer
                    .querySelector(`.${list.textContent}`)
                    .classList.add("slide-selected");
            });
        });
    }, []);
    return (
        <div className={styles.sliders} ref={slidesRef}>
            <ul>
                {lists.map((li) => (
                    <li
                        className={li === defaultCheck ? "selected" : ""}
                        key={li}
                    >
                        <button type="button">{li}</button>
                    </li>
                ))}
            </ul>
            <div className="slideContainer">{children}</div>
        </div>
    );
}
