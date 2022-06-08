import React from "react";
import styles from "../../css/App.module.scss";

export default function Loader() {
    return (
        <div className={styles.loader}>
            <div className="loader-circle"></div>
        </div>
    );
}
