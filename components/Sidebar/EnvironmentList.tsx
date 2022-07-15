import { EnvironmentType } from "@utils/Env";
import styles from "@styles/Sidebar.module.scss";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { BsLayers } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";

export default function EnvironmentList({ env }: { env: EnvironmentType }) {
    const [activateOptions, setActivateOptions] = useState(false);
    return (
        <li>
            <span className={styles.iconSvg}>
                <BsLayers />
            </span>
            <h4
                style={{
                    margin: `5px 0 10px`,
                }}>
                {env.name}
            </h4>
            <span
                className={styles.iconSvg}
                onClick={() => {
                    setActivateOptions(!activateOptions);
                }}>
                <div
                    className={`${styles.moreOptions} ${
                        activateOptions ? styles.activate : ""
                    }`}>
                    {activateOptions && <div className={styles.overlay}></div>}
                    <button className={styles.moreOptionsButton} type="button">
                        <FiEdit />
                        <span>Edit</span>
                    </button>
                    <button className={styles.moreOptionsButton} type="button">
                        <RiDeleteBin5Line />
                        <span>Remove</span>
                    </button>
                </div>
                <BiDotsVerticalRounded
                    data-tip="More Options"
                    data-place="left"
                />
            </span>
        </li>
    );
}
