import React, { createContext, useContext, useState, useEffect } from "react";

const Context = createContext({});

export type EnvironmentType = {
    name: string;
    variables: Array<{
        key: string;
        value: string;
    }>;
};
type ArrayEnvironmentType = Array<EnvironmentType>;
type normalParams = {
    object?: ArrayEnvironmentType;
    setObject?: React.Dispatch<React.SetStateAction<ArrayEnvironmentType>>;
};

export function useEnvironment() {
    const historySaver: normalParams = useContext(Context);

    return historySaver;
}

export function EnvironmentContext({ children }) {
    const [object, setObject] = useState<ArrayEnvironmentType>([
        {
            name: "local",
            variables: [
                {
                    key: "a",
                    value: "local",
                },
                {
                    key: "c",
                    value: "out of the world",
                },
            ],
        },
        // {
        //     name: "global",
        //     variables: [
        //         {
        //             key: "b",
        //             value: "global",
        //         },
        //     ],
        // },
    ]);
    return (
        <Context.Provider value={{ object, setObject }}>
            {children}
        </Context.Provider>
    );
}
