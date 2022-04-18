import React from "react";
import styles from "../../css/App.module.scss";

export default function UrlInput() {
    return (
        <form className={styles.UrlInput}>
            <select>
                <option value="Get" defaultChecked>
                    Get
                </option>
                <option value="Post">Post</option>
                <option value="Put">Put</option>
                <option value="Patch">Patch</option>
                <option value="Delete">Delete</option>
            </select>
            <input type="text" placeholder="Enter a URL" />
            <button type="submit">Send</button>
        </form>
    );
}
