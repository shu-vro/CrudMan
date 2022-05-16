import React, { createContext, useContext, useState } from "react";

const Context = createContext({});

interface normalParams {
    headers?: {};
    body?: {};
    data?: {};
    elapsedTime?: number;
    status?: number;
    statusText?: string;
    setObject?: React.Dispatch<React.SetStateAction<{}>>;
}

export function useApiData(): normalParams {
    return useContext(Context);
}

export function ApiDataContext({ children }) {
    const [object, setObject] = useState({});
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
