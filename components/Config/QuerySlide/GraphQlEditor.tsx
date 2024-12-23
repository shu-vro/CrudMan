import { useParams } from "@utils/Params";
import AceCodeEditor from "components/Editors/AceCodeEditor";
import MonacoCodeEditor from "components/Editors/MonacoCodeEditor";
import useDeviceType from "hooks/useDeviceType";
import { useState } from "react";
import styles from "@styles/GraphqlEditor.module.scss";

export default function GraphQlEditor() {
    const param = useParams();
    const [queryValue, setQueryValue] = useState(``);
    const [variablesValue, setVariablesValue] = useState(``);
    const isMobile = useDeviceType();
    const [tab, setTab] = useState("query");

    return (
        <>
            <h2>GraphQl Query</h2>
            <div className={styles["tab-container"]}>
                <input
                    type="radio"
                    name="select-query"
                    id="gql-query"
                    title="query"
                    defaultChecked
                    onClick={() => {
                        setTab("query");
                    }}
                />
                <input
                    type="radio"
                    name="select-query"
                    id="gql-variables"
                    title="variables"
                    onClick={() => {
                        setTab("variables");
                    }}
                />
                <label htmlFor="gql-query">
                    Query
                    {tab === "query" && <div className={styles.underline} />}
                </label>
                <label htmlFor="gql-variables">
                    Variables
                    {tab === "variables" && (
                        <div className={styles.underline} />
                    )}
                </label>
            </div>
            {tab === "query" ? (
                isMobile === "mobile" ? (
                    <AceCodeEditor
                        value={queryValue}
                        mode="puppet"
                        onChange={value => {
                            setQueryValue(value);
                            param.setObject(prev => ({
                                query: value,
                                variables: prev?.variables || "",
                            }));
                        }}
                    />
                ) : (
                    <MonacoCodeEditor
                        language="graphql"
                        onChange={value => {
                            setQueryValue(value);
                            param.setObject(prev => ({
                                query: value,
                                variables: prev?.variables || "",
                            }));
                        }}
                        value={queryValue}
                    />
                )
            ) : isMobile === "mobile" ? (
                <AceCodeEditor
                    value={variablesValue}
                    onChange={value => {
                        setVariablesValue(value);
                        param.setObject(prev => ({
                            variables: value,
                            query: prev?.query || "",
                        }));
                    }}
                />
            ) : (
                <MonacoCodeEditor
                    onChange={value => {
                        setVariablesValue(value);
                        param.setObject(prev => ({
                            variables: value,
                            query: prev?.query || "",
                        }));
                    }}
                    value={variablesValue}
                />
            )}
        </>
    );
}
