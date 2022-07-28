import React from "react";
import Creatable from "react-select/creatable";

export default function Select({
    options,
    ...rest
}: {
    options: Array<any>;
    [key: string]: any;
}) {
    return (
        <Creatable
            options={options}
            isClearable={true}
            createOptionPosition="first"
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    fontSize: 12,
                    border: "none",
                    minHeight: 20,
                    borderBottom: `2px solid var(--thin-border-color)`,
                    background: "transparent",
                    borderRadius: 0,
                }),
                option: (provided, state) => ({
                    ...provided,
                    background: state.isFocused
                        ? "var(--input-place-hover-bg)"
                        : state.isSelected
                        ? "var(--blue-color)"
                        : "transparent",
                }),
                input: (provided, state) => ({
                    ...provided,
                    color: "var(--general-text-color)",
                }),
                singleValue: (provided, state) => {
                    return {
                        ...provided,
                        color: "var(--general-text-color)",
                    };
                },
                dropdownIndicator: (provided, state) => ({
                    ...provided,
                    display: "none",
                }),
                menu: (provided, state) => ({
                    ...provided,
                    background: "var(--slide-bg-color)",
                    color: "var(--general-text-color)",
                    fontSize: 12,
                }),
                indicatorsContainer: (provided, state) => ({
                    ...provided,
                    height: 25,
                }),
            }}
            {...rest}
            defaultValue="hello"
        />
    );
}
