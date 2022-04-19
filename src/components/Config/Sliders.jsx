import { useEffect, useRef } from "react";
import styles from "../../css/App.module.scss";

export default function Sliders() {
    let slides = useRef(null);
    useEffect(() => {
        let listsEl = slides.current.querySelectorAll("ul li");

        listsEl.forEach((list) => {
            list.addEventListener("click", () => {
                listsEl.forEach((list) => {
                    list.classList.remove("selected");
                });
                list.classList.add("selected");
            });
        });
    }, []);
    return (
        <div className={styles.sliders} ref={slides}>
            <ul>
                <li>
                    <button>Query</button>
                </li>
                <li>
                    <button>Header</button>
                </li>
                <li>
                    <button>Auth</button>
                </li>
                <li>
                    <button>Body</button>
                </li>
                <li>
                    <button>Test</button>
                </li>
            </ul>
            <div className="slideContainer">
                <QuerySlide />
            </div>
        </div>
    );
}

function QuerySlide() {
    return (
        <form className="slide query-slide" frame="hsides">
            <div className="input-place">
                <input type="checkbox" />
                <input type="text" />
                <input type="text" />
            </div>
        </form>
    );
}
