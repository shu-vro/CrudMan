import React, { useRef } from "react";
import styles from "@styles/App.module.scss";
import Histories from "./Histories";
import { HistorySvg, EnvironmentSvg } from "components/Nav/ButtonSvg";
import { useTheme } from "@utils/Theme";

export default function Sidebar() {
    const sidebarRef = useRef(null);
    const { value: theme } = useTheme();
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
                    <span data-tip="History" data-place="left">
                        <HistorySvg />
                    </span>
                    <span data-tip="Environment" data-place="left">
                        <EnvironmentSvg />
                    </span>
                </div>
                <Histories />
            </div>
        </div>
    );
}
