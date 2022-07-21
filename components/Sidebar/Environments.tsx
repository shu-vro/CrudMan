import { useRef } from "react";
import { useEnvironment } from "@utils/Env";
import EnvironmentList from "./EnvironmentList";
import styles from "@styles/Sidebar.module.scss";
import ModalStyles from "@styles/ModalForms.module.scss";
import { v4 } from "uuid";
import { TbPackgeExport } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import Tooltip from "components/Tooltip";
import NewEnvForm from "./NewEnvForm";

export default function Environments() {
    const listRequestRef = useRef(null);
    const selectEnvRef = useRef(null);
    const environment = useEnvironment();

    function handleSearch(e: React.FormEvent<HTMLInputElement>) {
        let listRequests: HTMLLIElement = listRequestRef.current;
        let value = (e.target as HTMLInputElement).value.toUpperCase();

        let li = listRequests.querySelectorAll("li");

        for (let i = 0; i < li.length; i++) {
            const l = li[i].textContent.toUpperCase();
            if (l.includes(value)) li[i].style.display = "flex";
            else li[i].style.display = "none";
        }
    }

    function createNewEnv() {
        document
            .getElementById("newEnvForm")
            ?.classList.add(ModalStyles.active);
    }

    function selectEnv() {
        let element: HTMLSelectElement = selectEnvRef.current;
        let index = element.selectedIndex;
        environment.setDefaultObject([
            environment.object.find(({ name }) => name === "global"),
            environment.object[index],
        ]);
    }

    return (
        <div className={styles.sidebar_environments}>
            <div className={styles.inputAndButton}>
                <input
                    type="search"
                    onInput={handleSearch}
                    placeholder="Search"
                />
            </div>
            <select
                name="envSelect"
                ref={selectEnvRef}
                className="select-transparent"
                id={styles.select_button}
                onChange={selectEnv}>
                <option value="" defaultChecked hidden>
                    Select Environment
                </option>
                {environment.object.map(env => {
                    if (env.name === "global") {
                        return;
                    }
                    return (
                        <option value={env.name} key={env.name}>
                            {env.name}
                        </option>
                    );
                })}
            </select>
            <div className={styles.helperButtons} onClick={createNewEnv}>
                <span className={styles.iconSvg}>
                    <AiOutlinePlus />
                </span>
                <h4
                    style={{
                        margin: `5px 0 10px`,
                    }}>
                    New
                </h4>
                <button
                    type="button"
                    className={styles.iconSvg}
                    data-tip="Export to file"
                    data-place="left"
                    onClick={e => {
                        e.stopPropagation();
                        var dataStr =
                            "data:text/json;charset=utf-8," +
                            encodeURIComponent(
                                JSON.stringify(environment.object, null, 4)
                            );
                        var dlAnchorElem = document.createElement("a");
                        dlAnchorElem.setAttribute("href", dataStr);
                        dlAnchorElem.setAttribute("download", `${v4()}.json`);
                        dlAnchorElem.click();
                        dlAnchorElem.remove();
                    }}>
                    <TbPackgeExport />
                </button>
            </div>
            <ul className={styles.list_requests} ref={listRequestRef}>
                {environment.object.map(env => (
                    <EnvironmentList key={env.name} env={env} />
                ))}
            </ul>
            <Tooltip />
            <NewEnvForm id="newEnvForm" defaultEnv={null} />
        </div>
    );
}
