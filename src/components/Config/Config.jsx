import React from "react";
import styles from "../../css/App.module.scss";
import UrlInput from "./UrlInput";
import Sliders from "./Sliders";

export default function Config() {
    return (
        <div className={styles.config}>
            <UrlInput />
            <Sliders />
        </div>
    );
}
