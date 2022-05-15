import { createContext, useContext, useState } from "react";
import { normalParams } from "./interfaces";

const Context = createContext({});

export function usePostBody(): normalParams {
    return useContext(Context);
}

export function PostBodyContext({ children }) {
    const [object, setObject] = useState({});
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
