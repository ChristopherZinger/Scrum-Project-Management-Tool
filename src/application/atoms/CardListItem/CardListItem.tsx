
import { FlexDiv } from "../FlexDiv/FlexDiv";
import styled from "styled-components";

export const CardListItem = styled(FlexDiv)`
  padding: 5px 0px;
  padding-left: 10px;
  transition-duration: .3s;

  :hover {
    padding-left: 15px;
    text-decoration: underline;
  } 
`;
