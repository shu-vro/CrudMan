import { createContext, useContext, useState } from "react";

const Context = createContext();

export function useTest() {
    return useContext(Context);
}

export function TestContext({ children }) {
    const [object, setObject] = useState({});
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
