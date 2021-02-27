import styled from "styled-components";
import { Modal as SemanticUIModal } from "semantic-ui-react"
import { Colors } from "../../../global-styles/global-styles";

export const Modal = styled(SemanticUIModal)`
  &&& {
    border-radius: 0px;
    border: 2px solid black;

    .actions {
      background: white;
      border-top:1px solid black;
      height: 40px;
      padding: 0px;
    }

    .header {
      border-bottom: 1px solid black;
    }

    button {
      color: black; 
      padding: 0px 20px;
      background: none;
      outline: none;
      border: none;
      border-left: 1px solid black;
      height: 100%;
      transition-duration: .3s;
      cursor: pointer;
    }

    button:hover {
      background-color: ${Colors.UI04};
    }
  }
`