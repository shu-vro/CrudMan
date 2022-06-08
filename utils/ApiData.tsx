import React, { createContext, useContext, useState } from "react";

const Context = createContext({});

interface ObjectType {
    headers?: object;
    data?: object | any[];
    elapsedTime?: number;
    status?: number;
    statusText?: string;
    size?: number;
    isFinished?: boolean;
}
interface normalParams {
    object?: ObjectType;
    setObject?: React.Dispatch<React.SetStateAction<ObjectType>>;
}

export function useApiData(): normalParams {
    return useContext(Context);
}

export function ApiDataContext({ children }) {
    const [object, setObject] = useState({
        isFinished: true,
    });
    return (
        <Context.Provider value={{ object, setObject }}>
            {children}
        </Context.Provider>
    );
}
