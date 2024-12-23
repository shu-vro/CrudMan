import React from "react";

export interface normalParams {
    setObject?: React.Dispatch<React.SetStateAction<normalParams["object"]>>;
    object?: Record<string, any>;
    [props: string]: any;
}
