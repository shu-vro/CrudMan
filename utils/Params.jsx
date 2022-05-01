import { createContext, useContext, useState } from "react";

const Context = createContext();

export function useParams() {
    return useContext(Context);
}

export function ParamContext({ children }) {
    const [object, setObject] = useState({});
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
