import React from "react";

export interface normalParams {
    setObject?: React.Dispatch<React.SetStateAction<{}>>;
    [props: string]: string | Function;
}
