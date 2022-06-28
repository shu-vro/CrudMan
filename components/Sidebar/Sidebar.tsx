import React, { useRef } from "react";
import styles from "@styles/App.module.scss";
import Histories from "./Histories";

export default function Sidebar() {
    const sidebarRef = useRef(null);
    return (
        <div className={`${styles.sidebar} inactive`} ref={sidebarRef}>
            <button
                type="button"
                className={styles.closeButton}
                onClick={() => {
                    sidebarRef.current.classList.add("inactive");
                }}>
                &times;
            </button>
            <div className={styles.sidebar_flex}>
                <div className={styles.sidebar_buttons}>
                    <span>History</span>
                    <span>Environments</span>
                </div>
                <Histories />
            </div>
        </div>
    );
}
