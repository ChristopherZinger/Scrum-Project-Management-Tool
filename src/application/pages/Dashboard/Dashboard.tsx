import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../global-styles/global-styles";
import { Switch, Route } from "react-router-dom";
import { Profile } from "./Profile/Profile";
import { Admin } from "./Admin/Admin";
import { LogoutModal } from "../../components/LogoutModal/LogoutModal";
import { Sidenav, sideNavWidth } from "../../components/Sidenav/Sidenav";
import { RoutesMain } from "../AppRoutes";
import { Project } from "./Project/Project";
import { ProjectContextWrapper } from "../../context/project-context/ProjectContext";

const StyledDashboardContainer = styled.div`
  padding: 30px;
  transform: translate(${sideNavWidth}); 
  width: calc(100% - ${sideNavWidth});
  background-color: ${Colors.UI02};
  min-height: 100vh;
`;

export enum RoutesDashboard {
  ADMIN = "/admin",
  PROJECT = "/project/:id"
}

export const Dashboard = () => {
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

  return (
    <>
      <Sidenav clickLogout={() => setLogoutModalIsOpen(true)} />

      <StyledDashboardContainer >
        <Switch>
          <Route path={RoutesDashboard.ADMIN}>
            <Admin />
          </Route>

          <Route path={RoutesDashboard.PROJECT}>
            <ProjectContextWrapper>
              <Project />
            </ProjectContextWrapper>
          </Route>

          <Route path={[RoutesMain.HOME, RoutesMain.DASHBOARD]} >
            <Profile />
          </Route>
        </Switch>
      </StyledDashboardContainer>

      { logoutModalIsOpen && (
        <LogoutModal
          close={() => setLogoutModalIsOpen(false)}
        />
      )}
    </>
  )
}