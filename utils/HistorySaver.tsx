import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext({});

type normalParams = {
    object?: Array<{
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
        time: string;
    }>;
    setObject?: React.Dispatch<React.SetStateAction<any[]>>;
};

export function useHistorySaver(): normalParams {
    const history: normalParams = useContext(Context);
    useEffect(() => {
        if (!localStorage.getItem("history")) {
            localStorage.setItem("history", JSON.stringify([]));
            return;
        }
        history.setObject(JSON.parse(localStorage.getItem("history") || "[]"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        history.object.length > 0 &&
            localStorage.setItem("history", JSON.stringify(history.object));
    }, [history]);

    return useContext(Context);
}

export function HistoryContext({ children }) {
    const [object, setObject] = useState([]);
    return (
        <Context.Provider value={{ object, setObject }}>
            {children}
        </Context.Provider>
    );
}
