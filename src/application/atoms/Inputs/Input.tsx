import styled from "styled-components";
import { Field } from "formik";

export const Input = styled(Field)`
    display: block;
    width: 100%;
    border: none ;
    outline: none;
    margin-top: 10px;
    border-radius: 0px ;
    border-bottom: 1px solid black ;
    background-color: transparent ;
    font-size: 20px ;
`


const StyledCheckbox = styled(Field)`
    height: 18px;
    width: 18px;
    margin-right: 10px;
`

export const Checkbox = (props: { labelText: string, [key: string]: any }) => {
    const checkboxProps: { [key: string]: any } = {};
    for (const key in props) {
        if (key !== "labelText") {
            checkboxProps[key] = props[key]
        }
    }

    return (
        <>
            <StyledCheckbox type="checkbox" {...checkboxProps} />
            <label>{props.labelText}</label>
        </>
    )
}