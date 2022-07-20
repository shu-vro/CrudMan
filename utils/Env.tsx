import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext({});

export type EnvironmentType = {
    name: string;
    variables: Array<{
        key: string;
        value: string;
    }>;
};
type ArrayEnvironmentType = Array<EnvironmentType>;
type normalParams = {
    object?: ArrayEnvironmentType;
    setObject?: React.Dispatch<React.SetStateAction<ArrayEnvironmentType>>;
    defaultObject?: ArrayEnvironmentType;
    setDefaultObject?: React.Dispatch<
        React.SetStateAction<ArrayEnvironmentType>
    >;
};

/**
 * More at components/Config/QuerySlide/QuerySlide.tsx:40
 * @returns object with history, setHistory, defaultHistory, setDefaultHistory
 */
export function useEnvironment() {
    const historySaver: normalParams = useContext(Context);

    return historySaver;
}

export function EnvironmentContext({ children }) {
    const defaultEnv = {
        name: "global",
        variables: [
            {
                key: "Variable",
                value: "Value",
            },
        ],
    };
    const [object, setObject] = useState<ArrayEnvironmentType>([defaultEnv]);
    const [defaultObject, setDefaultObject] = useState<ArrayEnvironmentType>(
        []
    );

    return (
        <Context.Provider
            value={{ object, setObject, defaultObject, setDefaultObject }}>
            {children}
        </Context.Provider>
    );
}
