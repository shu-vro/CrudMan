import React from "react";

export interface normalParams {
    setObject?: React.Dispatch<React.SetStateAction<{}>>;
    object?: Object;
    [props: string]: any;
}
