import { createContext, useContext, useState } from "react";

const Context = createContext();

export function useHeaders() {
    return useContext(Context);
}

export function HeaderContext({ children }) {
    const [object, setObject] = useState({});
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
