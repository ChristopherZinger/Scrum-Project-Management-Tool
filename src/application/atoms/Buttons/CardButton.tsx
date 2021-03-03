import React from "react";
import { Colors } from "../../../global-styles/global-styles";
import { Popup, Icon, SemanticICONS } from "semantic-ui-react";
import styled from "styled-components";

type Props = {
  popupText: string;
  iconName: SemanticICONS | undefined
  isActive?: boolean;
  isLoading?: boolean;
  color?: string;
  onClick: () => void
}

const BtnWrapper = styled.div`
  padding: 8px 10px;
  display: inline-block;
  border: 1px solid ${Colors.UI03} ;
  cursor: pointer;
`;

export const CardButton = (props: Props) => {
  if (!props.isLoading) {
    return (
      <BtnWrapper>
        <Popup
          content={props.popupText}
          trigger={
            <p style={{ color: `${props.color || Colors.Warning}` }}
              onClick={async () => (props.isActive || true) && await props.onClick()
              }>
              <Icon name={props.iconName} color="grey" style={{ margin: "0px" }} />
            </p>
          } />
      </BtnWrapper>
    )
  } else {
    return (
      <BtnWrapper>
        ...
      </BtnWrapper>
    )
  }
}