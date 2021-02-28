import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { Heading } from "../../../../global-styles/global-styles";
import { DashboardCard } from "../../../atoms/DashboardCard/DashboardCard";
import { UserAuthStateContext } from "../../../../App";
import { ProjectListCard } from "../../../components/ProjectListCard/ProjectListCard";

export const Profile = () => {
  const { user } = useContext(UserAuthStateContext);

  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Heading.H2>Profile</Heading.H2>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={3} stretched>
        <Grid.Column>
          <DashboardCard title={!user ? "Hello" : ("Hi, " + user.firstname)}>
            {user && (
              <ul>
                <li>{user.firstname + " " + user.lastname}</li>
                <li>{user.email}</li>
                <li>{user.isActive ? "Active Profile" : "You need to activate your profile"}</li>
              </ul>
            )}
          </DashboardCard>
        </Grid.Column>

        <Grid.Column>
          <ProjectListCard />
        </Grid.Column>

        <Grid.Column>
          <DashboardCard title="Calendar">

          </DashboardCard>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}