import React from "react";
import { Colors } from "../../../global-styles/global-styles";
import styled from "styled-components";

const StyledWrapper = styled.div`
  background-color: ${Colors.UI01};
  border: 1px solid ${Colors.UI03};
  min-width: 100%;
  padding: 20px;
  max-height: 350px;
  overflow-y: auto;

  h1 {
    font-size: 16px;
  }

  .cardContent {
    padding: 20px 0px;
  }
`;

type Props = {
  title: string;
  children: React.ReactNode;
}

export const DashboardCard = (props: Props) => {
  return (
    <StyledWrapper>
      <div>
        <h1>{props.title}</h1>
      </div>
      <div className="cardContent">
        {props.children}
      </div>
    </StyledWrapper>
  )
}