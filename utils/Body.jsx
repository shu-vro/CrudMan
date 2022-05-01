import { createContext, useContext, useState } from "react";

const Context = createContext();

export function usePostBody() {
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
