import React from "react";
import styled from "styled-components"

const SpinnerStyle = styled.div`
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  top: 50%;

  span {
    width: 4px;
    height: 25px;
    background: ${(props => props.color || "white")};
    display: inline-block;
    position: absolute;
    -webkit-animation: load1 2s infinite ease-in-out;
    animation: load1 2s infinite ease-in-out;
  }

  span:nth-child(1){
    left: 0px;
    -webkit-animation-delay: -0.60s;
  animation-delay: -0.60s;
  }

  span:nth-child(2){
    left: 8px;
    -webkit-animation-delay: -0.40s;
  animation-delay: -0.40s;
  }

  span:nth-child(3){
    left: 16px;
    -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
  }

  span:nth-child(4){
    left: 24px;
  }

@-webkit-keyframes load1 {
  30%, 70% {
    transform: translate(0px)
  }
  0%, 20%, 80%, 100% {
    transform: translate(10px)
  }
}

@keyframes load1 {
  30%, 70% {
    transform: translate(0px)
  }
  0%, 20%, 80%, 100% {
    transform: translate(8px)
  }
}
`

export const Spinner = (props: { [key: string]: string }) => (
  <SpinnerStyle {...props}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </SpinnerStyle>
)
