import React from "react";
import styles from "@styles/App.module.scss";

export default function Loader() {
    return (
        <div className={styles.loader}>
            <div className={styles.loader_circle}></div>
        </div>
    );
}
