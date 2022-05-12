import { useEffect, useRef } from "react";
import styles from "../css/App.module.scss";

export default function CommonSliderAssets({
    children,
    lists,
    listBullets = [],
    defaultCheck,
}) {
    let slidesRef = useRef(null);
    useEffect(() => {
        /**
         * @type {HTMLDivElement}
         */
        const slides = slidesRef.current;
        const listsEl = slides.querySelectorAll("ul.list-ul li");
        const slideContainer = slides.querySelector(".slideContainer");

        listsEl.forEach((list) => {
            list.addEventListener("click", () => {
                listsEl.forEach((l) => {
                    l.classList.remove("selected");
                });
                list.classList.add("selected");
                slideContainer.querySelectorAll(".slide").forEach((child) => {
                    child.classList.remove("slide-selected");
                });
                slideContainer
                    .querySelector(`.${list.dataset.text}`)
                    .classList.add("slide-selected");
            });
        });
    }, []);
    return (
        <div className={styles.sliders} ref={slidesRef}>
            <ul className="list-ul">
                {lists.map((li, i) => (
                    <li
                        className={li === defaultCheck ? "selected" : ""}
                        key={i}
                        data-text={li}
                    >
                        <button type="button">{li}</button>
                        {listBullets[i] > 0 && <span>{listBullets[i]}</span>}
                    </li>
                ))}
            </ul>
            <div className="slideContainer">{children}</div>
        </div>
    );
}
