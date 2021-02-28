import styled from "styled-components";
import { Colors } from "../../../global-styles/global-styles";

export const Icon = styled.div<{
  src: string,
  color?: string,
  height?: string,
  width?: string,
}>`
  position: relative;
  display: block;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.color || Colors.UI05};
  height: ${props => (props.height || 25) + "px"};
  width: ${props => (props.height || 25) + "px"};

  mask: url(${props => props.src}) no-repeat center ;
  mask-size: cover;
  -webkit-mask: url(${props => props.src}) no-repeat center;
  -webkit-mask-size: cover;
`;