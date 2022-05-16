import { useEffect, useRef } from "react";
import styles from "../css/App.module.scss";

export default function CommonSliderAssets({
    children,
    lists,
    listBullets = [],
    defaultCheck,
    ulName = `list-ul`,
}) {
    let slidesRef = useRef(null);
    useEffect(() => {
        const slides: HTMLDivElement = slidesRef.current;
        const listsEl: NodeListOf<HTMLLIElement> = slides.querySelectorAll(
            `ul.${ulName} li`
        );
        const slideContainer: HTMLDivElement =
            slides.querySelector(".slideContainer");

        listsEl.forEach((list: HTMLLIElement) => {
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
    }, [ulName]);
    return (
        <div className={styles.sliders} ref={slidesRef}>
            <ul className={ulName}>
                {lists.map((li: string, i: number) => (
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
