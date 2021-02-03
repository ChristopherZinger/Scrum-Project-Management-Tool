import React from "react";
import { Colors } from "../style";
import styled, { css } from "styled-components";

export const StyledHoverStyleButton = styled.div`
    background: none;
    min-height: 60px;
    min-width: 200px;
    width: 100%;
    font-size: 20px;
    border: 2px solid black;
    cursor: pointer;
    position: relative;
    transition-delay: .25s;
    transition-duration: .25s;

    div:nth-child(1) {
        position:absolute;
        text-align:center;
        width: 100%;
        display: block;
        top: 50%;
        transform: translateY(-50%);   
    }

    div:nth-child(2) {
        top:0;
        z-index: -1;
        position: absolute;
        width: 0%;
        height: 100%;
        background: linear-gradient(-45deg, ${Colors.Palet04}, ${Colors.Palet01}, ${Colors.Palet02}, ${Colors.Palet05});
        background-size: 400% 400%;
        animation: gradient 7s ease infinite;
        transition-duration: .5s;
    }

    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    &:hover div:nth-child(2) {
        width: 100%;
    }

    &:hover{
        font-weight: bold;
        color: white;
        border-color: white;
    }

    ${props =>
        props.color &&
        css`
          border-color: ${props.color};
          color: ${props.color};

          div:nth-child(2) {
            background-color: gray;
        }
        `};
`;

export const HoverStyleButton = (props: { color?: Colors, text: string }) => {
    return (
        <StyledHoverStyleButton>
            <div>
                {props.text}
            </div>
            <div>
            </div>
        </StyledHoverStyleButton>
    )
}