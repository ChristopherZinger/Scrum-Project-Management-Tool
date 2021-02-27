import styled from "styled-components";



export const mobileBreakPoint = "767px";
export const tabletBreakPoint = "990px";
export const computerBreakPoint = "1199px";

export const decorativeFont = "Bungee";

export enum Colors {
  Palet01 = "#8ecae6",
  Palet02 = "#219ebc",
  Palet03 = "#023047",
  Palet04 = "#ffb703",
  Palet05 = "#fb8500",

  Text01 = "#232735",
  Text02 = "#505565",
  Text03 = "#8B90A0",
  TextInverse = "#FFFFFF",

  UI01 = "#FFFFFF",
  UI02 = "#FAFAFC",
  UI03 = "#F0F1F3",
  UI04 = "#D3D4D8",
  UI05 = "#A1A4B1",
  UI06 = "#232735",
  UI07 = "#000000",

  Info = "#1AA2DE",
  Success = "#3FA83C",
  Error = "#DC2544",
  Warning = "#EB6123",
  Attention = "#F7B02F",
  Action = "#7E1E5E"
}



export const Heading = {
  H1: styled.h1`
      font-weight: 600;
      font-size: 40px;
      line-height: 1.25;
      color: ${Colors.Text01};
  
      @media (max-width: ${mobileBreakPoint}) {
        font-size: 24px;
      }
    `,
  H2: styled.h2`
      font-weight: 600;
      font-size: 24px;
      line-height: 1.25;
      color: ${Colors.Text01};
  
      @media (max-width: ${mobileBreakPoint}) {
        font-size: 18px;
      }
    `,
  H3: styled.h3`
      font-size: 20px;
      font-weight: 600;
      line-height: 1.25;
      margin: 0;
    `,

  H4: styled.h4`
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
      margin: 0 0 12px 0;
    `,

  H5: styled.h5`
      font-size: 14px;
      font-weight: 600;
      line-height: 1.5;
      margin: 0;
    `,

  H6: styled.h6`
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;
      color: ${Colors.Text03};
      text-transform: uppercase;
      letter-spacing: 0.75px;
    `
};