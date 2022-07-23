import { EnvironmentType } from "@utils/Env";
import styles from "@styles/Sidebar.module.scss";
import ModalStyles from "@styles/ModalForms.module.scss";
import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { BsLayers } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import { useEnvironment } from "@utils/Env";
import NewEnvForm from "./NewEnvForm";

export default function EnvironmentList({ env }: { env: EnvironmentType }) {
    const prefix = "new_env_";
    const [activateOptions, setActivateOptions] = useState(false);
    const environment = useEnvironment();

    function removeEnv() {
        const filtered = environment.object.filter(
            ({ name }) => name !== env.name
        );
        environment.setObject(filtered);
        if (
            environment.defaultObject.findIndex(
                ({ name }) => name === env.name
            ) > -1
        ) {
            const globalEnv = environment.defaultObject.find(
                ({ name }) => name === "global"
            );
            environment.setDefaultObject([globalEnv]);
        }
    }

    function editEnv() {
        document
            .getElementById(prefix + env.name)
            ?.classList.add(ModalStyles.active);
    }

    function isSelected(envName: String) {
        return environment.defaultObject.some(({ name }) => name === envName);
    }

    function selectEnv() {
        if (env.name !== "global") {
            const select = document.getElementById(
                styles.select_button
            ) as HTMLSelectElement;
            let index = environment.object.findIndex(
                ({ name }) => name === env.name
            );
            select.selectedIndex = index;
            environment.setDefaultObject([
                environment.object.find(({ name }) => name === "global"),
                env,
            ]);
        }
    }
    return (
        <li>
            <span className={styles.iconSvg}>
                <BsLayers />
            </span>
            <h4
                style={{
                    margin: `5px 0 10px`,
                }}
                onClick={selectEnv}>
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
                    <button
                        className={styles.moreOptionsButton}
                        type="button"
                        onClick={editEnv}>
                        <FiEdit />
                        <span>Edit</span>
                    </button>
                    {env.name !== "global" && (
                        <button
                            className={styles.moreOptionsButton}
                            type="button"
                            onClick={removeEnv}>
                            <RiDeleteBin5Line />
                            <span>Remove</span>
                        </button>
                    )}
                    <button className={styles.moreOptionsButton} type="button">
                        <MdOutlineCancel />
                        <span>Cancel</span>
                    </button>
                </div>
                <BiDotsVerticalRounded
                    data-tip="More Options"
                    data-place="left"
                />
            </span>
            <NewEnvForm
                id={prefix + env.name}
                defaultEnv={env}
                isSelected={isSelected(env.name)}
            />
        </li>
    );
}
