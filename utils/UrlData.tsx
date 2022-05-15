import { createContext, useContext, useState } from "react";

const Context = createContext({});

interface urlProps {
    urlParams?: string;
    url?: string;
    method?: string;
    baseURL?: string;
    setObject?: (value: any) => void;
}

export function useUrlData(): urlProps {
    return useContext(Context);
}

export function UrlDataContext({ children }) {
    const [object, setObject] = useState({
        urlParams: {},
        baseURL: "",
        url: "",
        method: "",
    });
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
