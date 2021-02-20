import React from "react";
import { Underlineable } from "../../../atoms/Underlineable/Underlineable";
import styled from "styled-components";
import { Checkbox } from "semantic-ui-react";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    p {
        font-size: 20px
    }
`

type Props = {
    isAdmin: boolean;
    click: () => void;
}

export const ToggleRegisterType = (props: Props) => {
    return (
        <Wrapper>
            <p>I am a &nbsp;</p>
            <Underlineable text=" office owner or administrator" underline={props.isAdmin} underlineStyle={{ bottom: "20px" }} />

            <Checkbox
                slider
                name="isOfficeAdmin" checked={props.isAdmin}
                onClick={props.click}
                style={{ margin: "0px 20px" }}
            />

            <p>I am a &nbsp;</p>
            <Underlineable text="team member" underline={!props.isAdmin} underlineStyle={{ bottom: "20px" }} />
        </Wrapper>
    )
}