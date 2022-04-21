import { useEffect, useRef } from "react";
import styles from "../../css/App.module.scss";
import { ParamContext } from "../../utils/Params";
import QuerySlide from "./QuerySlide";

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
        <ParamContext>
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
        </ParamContext>
    );
}
