import { createContext, useContext, useState } from "react";

const Context = createContext();

export function useCode() {
    return useContext(Context);
}

export function CodeContext({ children }) {
    const [object, setObject] = useState({ selectCode: `C# HttpClient` });
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
