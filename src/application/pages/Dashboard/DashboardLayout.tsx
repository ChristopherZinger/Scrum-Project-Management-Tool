import React, { } from "react";
import { UserProfileResponse } from "../../../types.d";
import styled from "styled-components";
import { Colors } from "../../atoms/style";
import { Link, Switch, Route } from "react-router-dom";
import { Profile } from "./Profile/Profile";
import { Admin } from "./Admin/Admin";

const sideNavWidth = "70px";

const StyledDashboardContainer = styled.div`
  transform: translate(${sideNavWidth}); 
  width: calc(100% - ${sideNavWidth});
  background-color: ${Colors.UI02};
  min-height: 100vh;
`;

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
  user: UserProfileResponse | null;
}

export const DashboardLayout = (props: Props) => {
  return (
    <>
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
      </StyledSideNav>
      <StyledDashboardContainer >
        <Switch>
          <Route path="/profile" >
            <Profile />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
        </Switch>
      </StyledDashboardContainer>
    </>
  )
}