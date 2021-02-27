import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "../../../global-styles/global-styles";
import logoutIcon from "../../images/icons/logout.svg";
import settingsIcon from "../../images/icons/settings.svg"
import homeIcon from "../../images/icons/house.svg"
import { useLocation } from "react-router-dom";

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

const SidenavIcon = styled.div<{
  src: string,
  color?: string,
}>`
  position: relative;
  display: block;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.color || Colors.UI05};
  height: 25px;
  width: 25px;

  mask: url(${props => props.src}) no-repeat center ;
  mask-size: cover;
  -webkit-mask: url(${props => props.src}) no-repeat center;
  -webkit-mask-size: cover;
`;

type Props = {
  clickLogout: () => void;
}

export const Sidenav = (props: Props) => {
  const location = useLocation();

  return (
    <StyledSideNav>
      <Link to="/profile">
        <div className="btn">
          <SidenavIcon src={homeIcon} />
        </div>
      </Link>
      <Link to="/admin" className="btn">
        <div className="btn">
          <SidenavIcon src={settingsIcon} />
        </div>
      </Link>
      <Link to={location.pathname} className="btn" onClick={props.clickLogout}>
        <div className="btn">
          <SidenavIcon src={logoutIcon} />
        </div>
      </Link>
    </StyledSideNav>
  )
}

