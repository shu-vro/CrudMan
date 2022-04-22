import { useEffect, useRef } from "react";
import styles from "../../css/App.module.scss";
import { QuerySlide, HeaderSlide, BodySlide } from ".";
import Wrapper from "./Wrapper";

export default function Sliders() {
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
    let lists = ["Query", "Header", "Body", "Test"];
    return (
        <Wrapper>
            <div className={styles.sliders} ref={slidesRef}>
                <ul>
                    {lists.map((li) => (
                        <li
                            className={li === "Query" ? "selected" : ""}
                            key={li}
                        >
                            <button>{li}</button>
                        </li>
                    ))}
                </ul>
                <form id="noId"></form>
                <div className="slideContainer">
                    <QuerySlide />
                    <HeaderSlide />
                    <BodySlide />
                </div>
            </div>
        </Wrapper>
    );
}
