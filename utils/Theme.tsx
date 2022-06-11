import {
    createContext,
    useContext,
    useState,
    SetStateAction,
    useEffect,
} from "react";

const Context = createContext({});

export function useTheme(): {
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
} {
    const themeManager: any = useContext(Context);
    useEffect(() => {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem(
                "theme",
                !window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "light"
                    : "dark"
            );
        }
        themeManager.setValue(localStorage.getItem("theme"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.body.className = localStorage.getItem("theme");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeManager]);

    return themeManager;
}

export function ThemeContext({ children }) {
    const [value, setValue] = useState("dark");
    return (
        <Context.Provider value={{ value, setValue }}>
            {children}
        </Context.Provider>
    );
}
