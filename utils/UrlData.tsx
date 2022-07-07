import { createContext, useContext, useState } from "react";

const Context = createContext({});

interface urlProps {
    object?: {
        urlParams?: Object;
        url?: string;
        method?: string;
        baseURL?: string;
    };
    setObject?: React.Dispatch<
        React.SetStateAction<{
            urlParams: Object;
            baseURL: string;
            url: string;
            method: string;
        }>
    >;
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
        <Context.Provider value={{ object, setObject }}>
            {children}
        </Context.Provider>
    );
}
