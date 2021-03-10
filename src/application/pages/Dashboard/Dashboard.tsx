import React, { useState } from "react";
import styled from "styled-components";
import { Colors } from "../../../global-styles/global-styles";
import { Switch, Route } from "react-router-dom";
import { Profile } from "./Profile/Profile";
import { Admin } from "./Admin/Admin";
import { LogoutModal } from "../../components/LogoutModal/LogoutModal";
import { Sidenav, sideNavWidth } from "../../components/Sidenav/Sidenav";
import { Project } from "./Project/Project";
import { ProjectContextWrapper } from "../../context/project-context/ProjectContext";
import { useRouteMatch } from "react-router-dom";
import { NotFound } from "../404/404";
import { RoutesMain } from "../AppRoutes";

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
  const match = useRouteMatch();

  return (
    <>
      <Sidenav clickLogout={() => setLogoutModalIsOpen(true)} />

      <StyledDashboardContainer >
        <Switch>
          <Route path={[RoutesMain.DASHBOARD, RoutesMain.HOME]} exact component={Profile} />
          <Route path={match.url + RoutesDashboard.ADMIN} component={Admin} />
          <Route path={match.url + RoutesDashboard.PROJECT}>
            <ProjectContextWrapper>
              <Project />
            </ProjectContextWrapper>
          </Route>
          <Route component={NotFound} />
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