import React from "react";
import styled, { css } from "styled-components";
import landingPageImage from "../../images/landing-page-scrum.svg"
import { mobileBreakPoint, tabletBreakPoint, computerBreakPoint } from "../../atoms/style";

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