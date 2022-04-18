import React from "react";
import styles from "../../css/App.module.scss";
import UrlInput from "./UrlInput";

export default function Config() {
    return (
        <div className={styles.config}>
            <UrlInput />
        </div>
    );
}
