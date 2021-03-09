import styled from "styled-components";
import { Modal as SemanticUIModal } from "semantic-ui-react"
import { Colors } from "../../../global-styles/global-styles";

export const Modal = styled(SemanticUIModal)`

  &&& {

    border: 2px solid black;
    border-radius: 0px;

    @media only screen and (max-width: 767px){
      border: none;
      height: 100vh;
      width: 100vw;
      top: 0px;
      left: 0px;
      margin-top: 0px !important;
      margin: 0px !important;
      border: 5px solid coral;

      display: flex !important;
      flex-direction: column !important;
      justify-content: space-between !important;

      .actions {
        display: flex !important;
        align-items: stretch !important;
        
      }
      button {
        flex-grow: 1;
        flex-basis: 0;
      }
      button:first-child{
        border-left: none !important;
      }
    }

    .actions {
      background: white;
      border-top:1px solid #7a2a2a;
      height: 40px;
      padding: 0px !important;
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