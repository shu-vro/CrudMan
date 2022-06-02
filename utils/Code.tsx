import React, { createContext, useContext, useState } from "react";

const Context = createContext({});

interface codeProps {
    selectCode?: string;
    code?: string;
    setObject?: React.Dispatch<
        React.SetStateAction<{
            selectCode: string;
            code: string;
            [others: string]: any;
        }>
    >;
}

export function useCode(): codeProps {
    return useContext(Context);
}

export function CodeContext({ children }) {
    const [object, setObject] = useState({
        selectCode: `C# HttpClient`,
        code: "",
    });
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
