import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "../../../global-styles/global-styles";


export const sideNavWidth = "70px";

const StyledSideNav = styled.div`
top: 0px;
height: 100%;
width: ${sideNavWidth};
background-color: ${Colors.UI02};
position: fixed;
border-right: 1px solid ${Colors.UI04};

.btn {
  width: 100%;
  height: ${sideNavWidth};
  text-align: center;
  vertical-align: middle;
  border-bottom:1px solid ${Colors.UI04};
}
`;

type Props = {
  clickLogout: () => void;
}

export const Sidenav = (props: Props) => {
  return (
    <StyledSideNav>
      <Link to="/profile">
        <div className="btn">
          pro
      </div>
      </Link>
      <Link to="/admin" className="btn">
        <div className="btn">
          adm
      </div>
      </Link>
      <Link to="/#" className="btn" onClick={props.clickLogout}>
        <div className="btn">
          out
      </div>
      </Link>
    </StyledSideNav>
  )
}
