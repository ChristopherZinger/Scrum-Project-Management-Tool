import React, { useState } from "react";
import { UserProfileResponse } from "../../../types.d";
import styled from "styled-components";
import { Colors } from "../../../global-styles/global-styles";
import { Switch, Route } from "react-router-dom";
import { Profile } from "./Profile/Profile";
import { Admin } from "./Admin/Admin";
import { LogoutModal } from "../../components/LogoutModal/LogoutModal";
import { Sidenav, sideNavWidth } from "../../components/Sidenav/Sidenav";


const StyledDashboardContainer = styled.div`
  padding: 30px;
  transform: translate(${sideNavWidth}); 
  width: calc(100% - ${sideNavWidth});
  background-color: ${Colors.UI02};
  min-height: 100vh;
`;

type Props = {
  user: UserProfileResponse | null;
}

export const Dashboard = (props: Props) => {
  const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);

  return (
    <>
      <Sidenav clickLogout={() => setLogoutModalIsOpen(true)} />

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


      { logoutModalIsOpen && (
        <LogoutModal
          close={() => setLogoutModalIsOpen(false)}
        />
      )}
    </>
  )
}