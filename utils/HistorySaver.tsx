import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext({});

export type HistoryType = {
    params: object;
    headers: object;
    url: string;
    body: object;
    method: string;
    tests: Array<{
        section: string;
        key: string;
        operation: string;
        value: string;
    }>;
    auth: {
        headers: object;
        params: object;
    };
    time: string;
};
type ArrayHistoryType = Array<HistoryType>;
type normalParams = {
    object?: ArrayHistoryType;
    setObject?: React.Dispatch<React.SetStateAction<ArrayHistoryType>>;
    defaultObject?: HistoryType;
    setDefaultObject?: React.Dispatch<React.SetStateAction<HistoryType>>;
};

export function useHistorySaver() {
    const historySaver: normalParams = useContext(Context);
    // useEffect(() => {
    //     console.log(true);
    // }, []);

    return historySaver;
}

export function HistoryContext({ children }) {
    const [object, setObject] = useState([]);
    const [defaultObject, setDefaultObject] = useState<HistoryType>({
        params: {},
        headers: {},
        body: {},
        method: "",
        tests: [],
        time: "",
        url: "",
        auth: {
            headers: {},
            params: {},
        },
    });
    return (
        <Context.Provider
            value={{ object, setObject, defaultObject, setDefaultObject }}>
            {children}
        </Context.Provider>
    );
}
