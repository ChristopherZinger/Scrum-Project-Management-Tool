import React from "react";
import { Colors } from "../../../global-styles/global-styles";

type Props = {
  text: string;
  isActive?: boolean;
  isLoading?: boolean;
  color?: string;
  onClick: () => void
}



export const ButtonText = (props: Props) => {
  if (!props.isLoading) {
    return (
      <p style={{ color: `${props.color || Colors.Warning}`, cursor: "pointer" }}
        onClick={async () => (props.isActive || true) && await props.onClick()
        }>
        {props.text}
      </p>
    )
  } else {
    return (
      <>
        ...
      </>
    )
  }
}
