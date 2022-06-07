import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";

var o: {
    params: object;
    setParams: React.Dispatch<React.SetStateAction<{}>>;
} = {
    params: {},
    setParams: () => true,
};
const Context = createContext(o);

function ContextProvider({ children }) {
    const [params, setParams] = useState({});

    useEffect(() => {
        console.log(params);
    }, [params]);
    return (
        <Context.Provider value={{ params, setParams }}>
            {children}
        </Context.Provider>
    );
}

export default function Test() {
    const [fields, setFields] = useState([v4()]);

    return (
        <ContextProvider>
            <form>
                {fields.map(e => {
                    return <Input key={e} />;
                })}
                <button
                    onClick={() => {
                        setFields([...fields, v4()]);
                    }}
                    type="button">
                    Click to add
                </button>
            </form>
        </ContextProvider>
    );
}

function Input() {
    const [f, setF] = useState("");
    const { params, setParams } = useContext(Context);
    return (
        <>
            <input
                type="text"
                onChange={e => {
                    setF(e.target.value);
                    setParams({ [e.target.value]: [params[f]] });
                }}
                value={params[f]}
            />{" "}
            <input
                type="checkbox"
                value={params[f]}
                onChange={({ target }) => {
                    setParams({ [f]: target.checked });
                }}
            />{" "}
            <br />
        </>
    );
}
