import { createContext, useContext, useState } from "react";

const Context = createContext();

export function useApiData() {
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
