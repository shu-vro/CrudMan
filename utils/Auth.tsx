import React, { createContext, useContext, useState } from "react";

const Context = createContext({});

interface AuthProps {
    headers?: object;
    params?: object;
    methodFromAuthSlide?: string;
    setObject?: React.Dispatch<React.SetStateAction<AuthProps>>;
}

export function useAuth(): AuthProps {
    return useContext(Context);
}

export function AuthContext({ children }) {
    const [object, setObject] = useState({
        headers: {},
        params: {},
    });
    return (
        <Context.Provider value={{ ...object, setObject }}>
            {children}
        </Context.Provider>
    );
}
