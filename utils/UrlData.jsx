import { createContext, useContext, useState } from "react";

const Context = createContext();

export function useUrlData() {
    return useContext(Context);
}

export function UrlDataContext({ children }) {
    const [object, setObject] = useState({
        urlParams: {},
        baseURL: "",
        url: "https://jsonplaceholder.typicode.com/comments?postId=1",
    });
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
