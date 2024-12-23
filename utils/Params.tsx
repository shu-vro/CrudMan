import { createContext, useContext, useState } from "react";
import { normalParams } from "./interfaces";

const Context = createContext({} as normalParams);

export function useParams() {
    return useContext(Context);
}

export function ParamContext({ children }) {
    const [object, setObject] = useState<normalParams>({});
    return (
        <Context.Provider value={{ object, setObject }}>
            {children}
        </Context.Provider>
    );
}
