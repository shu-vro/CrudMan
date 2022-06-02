import React, { createContext, useContext, useState } from "react";

const Context = createContext({});

export function useTest(): {
    props?: Array<{
        section: string;
        key: string;
        operation: string;
        value: string;
    }>;
    setObject?: React.Dispatch<React.SetStateAction<{}>>;
} {
    return useContext(Context);
}

export function TestContext({ children }) {
    const [object, setObject] = useState({ props: [] });
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
