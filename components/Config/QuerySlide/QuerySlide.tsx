import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import { ReactSortable } from "react-sortablejs";
import { useHistorySaver } from "@utils/HistorySaver";
import { defaultEnv, useEnvironment } from "@utils/Env";
import { useParams } from "@utils/Params";
import { useUrlData } from "@utils/UrlData";
import InputPlace from "./InputPlace";
import Checkbox from "components/Checkbox";
import GraphQlEditor from "./GraphQlEditor";

export default function QuerySlide() {
    const formRef = useRef(null);
    let param = useParams();
    let urlData = useUrlData();
    let historySaver = useHistorySaver();
    let environment = useEnvironment();
    const [props, setProps] = useState({});
    const [graphqlEnabled, setGraphqlEnabled] = useState(false);

    type FieldsType = Array<{
        id: string;
        entry?: [string?, any?];
        defaultChecked?: boolean;
    }>;
    const [fields, setFields] = useState<FieldsType>([
        { id: v4(), entry: ["", ""] },
    ]);

    function addField() {
        setFields([...fields, { id: v4(), entry: [] }]);
    }

    function removeField(keyName: string) {
        setFields(prev => prev.filter(field => field.id !== keyName));
    }

    /**
     * These lines should be in `historySaver` and `environment` file, but due to bugs, we are migrating these codes in here!
     */
    useEffect(() => {
        if (!localStorage.getItem("history")) {
            localStorage.setItem("history", JSON.stringify([]));
            return;
        }
        historySaver.setObject(
            JSON.parse(localStorage.getItem("history") || "[]")
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (!localStorage.getItem("env")) {
            localStorage.setItem("env", JSON.stringify([]));
            environment.setDefaultObject([defaultEnv]);
            return;
        }
        environment.setObject(JSON.parse(localStorage.getItem("env") || "[]"));
        environment.setDefaultObject([
            JSON.parse(localStorage.getItem("env"))?.[0],
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        localStorage.setItem("history", JSON.stringify(historySaver.object));
    }, [historySaver.object]);
    useEffect(() => {
        localStorage.setItem("env", JSON.stringify(environment.object));
    }, [environment.object]);
    useEffect(() => {
        let envVars = {};
        environment.defaultObject.forEach(env => {
            env?.variables.forEach(variable => {
                envVars[variable.key] = variable.value;
            });
        });
        environment.setVariables(envVars);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [environment.defaultObject]);

    // These lines should be in `historySaver` and `environment` file, but due to bugs, we are migrating these codes in here!
    //  -----------------------------------------------------

    function setParamsFollowingObject(object: object) {
        let entries = Object.entries(object);
        setFields([]);
        if (entries.length > 0) {
            entries.forEach(data => {
                setFields(prev => [
                    ...prev,
                    {
                        id: v4(),
                        entry: [data[0], data[1]],
                        defaultChecked: true,
                    },
                ]);
            });
        } else {
            setFields([{ id: v4(), entry: ["", ""] }]);
        }
        setTimeout(() => {
            formRef.current?.dispatchEvent(
                new Event("input", {
                    bubbles: true,
                })
            );
        }, 500);
    }

    useEffect(() => {
        let neededParam = historySaver.defaultObject.params;
        setParamsFollowingObject(neededParam);
        if (
            neededParam.hasOwnProperty("query") &&
            urlData.object.url.includes("graphql")
        ) {
            setGraphqlEnabled(true);
        } else {
            setGraphqlEnabled(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [historySaver.defaultObject]);

    // Setting params through props
    useEffect(() => {
        param.setObject(props);
        urlData.setObject(prev => ({
            ...prev,
            urlParams: props,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    useEffect(() => {
        if (!graphqlEnabled) {
            setParamsFollowingObject(urlData.object.urlParams);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graphqlEnabled]);

    function handleInput() {
        let inputPlace = formRef.current.querySelectorAll(".input-place");
        setProps({});
        for (let i = 0; i < inputPlace.length; i++) {
            const place = inputPlace[i];
            let isChecked = place.childNodes[0].querySelector("input").checked;
            if (isChecked !== true) continue;
            let key = place.childNodes[1].value;
            let value = place.childNodes[2].value;
            let o = {
                [key]: value,
            };
            setProps(prop => ({ ...prop, ...o }));
        }
    }
    return graphqlEnabled ? (
        <>
            <div className="slide Query slide-selected">
                <Checkbox
                    type="checkbox"
                    label="Disable Graphql"
                    checked
                    onChange={e => {
                        param.setObject(prev => {
                            delete prev["query"];
                            return prev;
                        });
                        setGraphqlEnabled(!graphqlEnabled);
                    }}
                />
                <GraphQlEditor />
            </div>
        </>
    ) : (
        <>
            <form
                className="slide Query slide-selected"
                id="config-query-slide"
                ref={formRef}
                onInput={handleInput}>
                <Checkbox
                    type="checkbox"
                    label="Enable Graphql"
                    onChange={e => {
                        setGraphqlEnabled(!graphqlEnabled);
                    }}
                />

                <h2>{graphqlEnabled ? "GraphQl Query" : "Query Parameters"}</h2>
                <ReactSortable
                    list={fields}
                    setList={setFields}
                    handle=".handle"
                    animation={150}
                    group="shared"
                    onEnd={() => {
                        setTimeout(() => {
                            formRef.current?.dispatchEvent(
                                new Event("input", {
                                    bubbles: true,
                                })
                            );
                        }, 0);
                    }}>
                    {fields.map(field => (
                        <InputPlace
                            key={field.id}
                            keyName={field.id}
                            formRef={formRef}
                            placeHolderNames={["parameter", "value"]}
                            defaultValue={field.entry}
                            removeField={removeField}
                            defaultChecked={field.defaultChecked}
                        />
                    ))}
                </ReactSortable>

                <button
                    type="button"
                    className="add-row-button"
                    onClick={addField}>
                    + Add Row
                </button>
            </form>
        </>
    );
}
