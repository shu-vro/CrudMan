import { useRef, useState } from "react";
import styles from "@styles/Sidebar.module.scss";
import Histories from "./Histories";
import Environments from "./Environments";
import { FaLeaf, FaTimes } from "react-icons/fa";
import { AiOutlineHistory } from "react-icons/ai";

export default function Sidebar() {
    const sidebarRef = useRef(null);
    const overlayRef = useRef(null);
    const [component, setComponent] = useState(<Histories />);
    function closeSidebar() {
        sidebarRef.current.classList.add("inactive");
        if (
            document
                .querySelector(`.${styles.sidebar}`)
                .classList.contains("inactive")
        ) {
            overlayRef.current.style.display = "none";
        } else {
            overlayRef.current.style.display = "block";
        }
    }

    return (
        <div className={`${styles.sidebar} inactive`} ref={sidebarRef}>
            <div
                className={styles.overlay}
                style={{ display: "none" }}
                onClick={() => {
                    closeSidebar();
                }}
                ref={overlayRef}></div>
            <button
                type="button"
                className={styles.closeButton}
                onClick={closeSidebar}>
                <FaTimes />
            </button>
            <div className={styles.sidebar_flex}>
                <div className={styles.sidebar_buttons}>
                    <span
                        data-tip="History"
                        data-place="left"
                        onClick={() => {
                            setComponent(<Histories />);
                        }}>
                        <AiOutlineHistory />
                    </span>
                    <span
                        data-tip="Environment"
                        data-place="left"
                        onClick={() => {
                            setComponent(<Environments />);
                        }}>
                        <FaLeaf />
                    </span>
                </div>
                {component}
            </div>
        </div>
    );
}
