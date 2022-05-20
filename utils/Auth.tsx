import { createContext, useContext, useState } from "react";
import { normalParams } from "./interfaces";

const Context = createContext({});

export function useAuth(): normalParams {
    return useContext(Context);
}

export function AuthContext({ children }) {
    const [object, setObject] = useState({});
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
