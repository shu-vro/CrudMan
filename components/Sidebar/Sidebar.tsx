import React, { useRef } from "react";
import styles from "../../css/App.module.scss";
import Histories from "./Histories";

export default function Sidebar() {
    const sidebarRef = useRef(null);
    return (
        <div className={`${styles.sidebar} inactive`} ref={sidebarRef}>
            <button
                type="button"
                className="closeButton"
                onClick={() => {
                    sidebarRef.current.classList.add("inactive");
                }}>
                &times;
            </button>
            <div className="sidebar-flex">
                <div className="sidebar-buttons">
                    <span>History</span>
                    <span>Environments</span>
                </div>
                <Histories />
            </div>
        </div>
    );
}
