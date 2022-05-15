import { createContext, useContext, useState, SetStateAction } from "react";

const Context = createContext({});

export function useTheme(): {
    value?: string;
    setObject?: (value: SetStateAction<string>) => void;
} {
    return useContext(Context);
}

export function ThemeContext({ children }) {
    const [value, setValue] = useState("dark");
    return (
        <Context.Provider value={{ value, setValue }}>
            {children}
        </Context.Provider>
    );
}
