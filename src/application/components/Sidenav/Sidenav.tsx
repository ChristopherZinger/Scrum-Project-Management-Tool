import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "../../../global-styles/global-styles";
import logoutIcon from "../../images/icons/logout.svg";
import settingsIcon from "../../images/icons/settings.svg"
import homeIcon from "../../images/icons/house.svg"
import { useLocation } from "react-router-dom";
import { Icon } from "../../atoms/Icon/Icon";

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
  const location = useLocation();

  return (
    <StyledSideNav>
      <Link to="/profile">
        <div className="btn">
          <Icon src={homeIcon} />
        </div>
      </Link>
      <Link to="/admin" className="btn">
        <div className="btn">
          <Icon src={settingsIcon} />
        </div>
      </Link>
      <Link to={location.pathname} className="btn" onClick={props.clickLogout}>
        <div className="btn">
          <Icon src={logoutIcon} />
        </div>
      </Link>
    </StyledSideNav>
  )
}

