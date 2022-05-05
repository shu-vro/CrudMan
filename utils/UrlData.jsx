import { createContext, useContext, useState } from "react";

const Context = createContext();

export function useUrlData() {
    return useContext(Context);
}

export function UrlDataContext({ children }) {
    const [object, setObject] = useState({
        urlParams: {},
        baseURL: "",
        url: "",
    });
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
