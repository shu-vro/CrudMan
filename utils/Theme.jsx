import { createContext, useContext, useState } from "react";

const Context = createContext();

export function useTheme() {
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
