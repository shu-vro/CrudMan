import styles from "@styles/ModalForms.module.scss";
import { useEnvironment } from "@utils/Env";
import { useId, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { v4 } from "uuid";

export default function NewEnvForm() {
    const formRef = useRef(null);
    const labelRef = useRef(null);
    const id = useId();
    const environment = useEnvironment();
    type FieldsType = Array<{
        id: string;
        entry?: [string?, any?];
        defaultChecked?: boolean;
    }>;
    const [fields, setFields] = useState<FieldsType>([]);
    function addField() {
        setFields([...fields, { id: v4(), entry: [] }]);
    }

    function removeAllField() {
        setFields([{ id: v4(), entry: ["", ""] }]);
    }

    function removeField(keyName: string) {
        setFields(prev => prev.filter(field => field.id !== keyName));
    }

    function cancelEnv() {
        document
            .querySelector(`.${styles.newEnvForm}`)
            ?.classList.remove(styles.active);
    }

    function saveEnv() {
        const name = labelRef.current.value;
        const form = formRef.current;
        let variables = [];
        const arrayEl = form.querySelectorAll(`.${styles.input__place}`);
        arrayEl.forEach((f: HTMLDivElement, index) => {
            if (index === 0) return;
            const key = (f.childNodes[0] as HTMLInputElement).value;
            const value = (f.childNodes[1] as HTMLInputElement).value;
            variables.push({ key, value });
        });
        let newEnv = {
            name,
            variables,
        };
        environment.setObject([...environment.object, newEnv]);
        cancelEnv();
    }
    return (
        <>
            <div className={styles.newEnvForm}>
                <div className={styles.layer}></div>
                <form className={`slide ${styles.form}`} ref={formRef}>
                    <h2>New Environment</h2>
                    <div className={`input-place ${styles.input__place}`}>
                        <label htmlFor={`${id}__label`}>Label</label>
                        <input
                            type="text"
                            id={`${id}__label`}
                            required
                            ref={labelRef}
                        />
                    </div>

                    <div className={styles.variable__list}>
                        <h3>Variable List</h3>
                        <div className={styles.button__list}>
                            <button type="button" onClick={addField}>
                                <AiOutlinePlus />
                            </button>
                            <button type="button" onClick={removeAllField}>
                                <RiDeleteBin5Line />
                            </button>
                        </div>
                    </div>

                    {fields.map(field => (
                        <Input
                            key={field.id}
                            keyName={field.id}
                            removeField={removeField}
                        />
                    ))}
                    {fields.length < 1 && (
                        <h2 className={styles.notice}>
                            Please click + sign to add new Environment variable
                        </h2>
                    )}
                    <div className={styles.env_form_footer}>
                        <button type="button" onClick={saveEnv}>
                            Save
                        </button>
                        <button type="button" onClick={cancelEnv}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

function Input({ keyName, entry = ["", ""], removeField }) {
    return (
        <>
            <div className={`input-place ${styles.input__place}`}>
                <input
                    type="text"
                    placeholder="Variable"
                    defaultValue={entry[0]}
                />
                <input
                    type="text"
                    placeholder="Value"
                    defaultValue={entry[1]}
                />
                <button
                    type="button"
                    onClick={() => {
                        removeField(keyName);
                    }}>
                    <FiDelete />
                </button>
            </div>
        </>
    );
}
