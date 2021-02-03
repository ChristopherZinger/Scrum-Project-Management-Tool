import React from "react";
import styled from "styled-components";
import { Colors } from "../style";

const CustomLinkStyle = styled.div`
    position : absolute;

    a {
        font-size 18px;
        font-weight: bold;
        color: black;
        transition-duration: .25s;
    }

    div{
        z-index: -1;
        display: block;
        position: absolute;
        left: -5px;
        height: 11px;
        width: 0%;
        background-color: ${Colors.Palet04};
        top: 10px;
        transition-duration: .3s;
    }

    &:hover div {
        width: 100%;
    }
`

type UnderlineLinkProps = {
    children: React.ReactNode
}

export const UnderlineLink = (props: UnderlineLinkProps) => {
    return (
        <CustomLinkStyle>
            {props.children}
            <div></div>
        </CustomLinkStyle>
    )
}