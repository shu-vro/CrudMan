import React, { createContext, useContext, useState } from "react";

const Context = createContext({});

interface normalParams {
    headers?: object;
    data?: object | any[];
    elapsedTime?: number;
    status?: number;
    statusText?: string;
    size?: number;
    setObject?: React.Dispatch<React.SetStateAction<normalParams>>;
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
