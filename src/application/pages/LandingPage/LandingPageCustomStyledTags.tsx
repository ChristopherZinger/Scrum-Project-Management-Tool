import React from "react";
import styled, { css } from "styled-components";
import landingPageImage from "../../images/landing-page-scrum.svg"
import { mobileBreakPoint, tabletBreakPoint, computerBreakPoint, Colors } from "../../atoms/style";

export const MarginWrapper = styled.div`
    padding: 40px;
`

export const Jumbotron = styled.div`
    font-size: 60px;
    line-height: 70px;
    font-family: 'Bungee', cursive;

    @media (max-width: ${computerBreakPoint}){
        font-size: 50px;
        line-height: 60px;  
    }

    @media (max-width: ${tabletBreakPoint}){
        font-size: 40px;
        line-height: 50px;  
    }

    @media (max-width: ${mobileBreakPoint}){
        font-size: 30px;
        line-height: 40px;  
    }
`

export const CustomDescription = styled.div`
    margin-top: 20px;   
    max-width: 500px;
    color: gray;
    line-height: 35px;
    font-size: 25px;

    @media (max-width: ${computerBreakPoint}){
        margin-top: 10px;  
        line-height: 35px;
        font-size: 20px;
    }

    @media (max-width: ${tabletBreakPoint}){
        margin-top: 20px;  
        line-height: 25px;
        font-size: 17px;
    }

    @media (max-width: ${mobileBreakPoint}){
        margin-top: 10px;  
        line-height: 25px;
        font-size: 17px;
    }
`;

export const BGImage = styled.div`
    z-index: -1;
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-image: url("${landingPageImage}");
    background-repeat: no-repeat;
    background-position: 70% 5%;
    background-size: 800px;
    
    @media (max-width: ${computerBreakPoint}){
        background-position: 80% 10%;
        background-size: 500px;
    }

    @media (max-width: ${tabletBreakPoint}){
        background-size: 400px;
    }

    @media (max-width: ${mobileBreakPoint}){
        display: none; 
    }
`

export const CoolButton = styled.div`
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

export const GetStartedButton = (props: { color?: Colors, text: string }) => {
    return (
        <CoolButton>
            <div>
                {props.text}
            </div>
            <div>
            </div>
        </CoolButton>
    )
}