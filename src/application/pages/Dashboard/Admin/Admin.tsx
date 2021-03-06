import React from "react";
import { Grid } from "semantic-ui-react";
import { DashboardCard } from "../../../atoms/DashboardCard/DashboardCard";
import { Heading } from "../../../../global-styles/global-styles";
import { TeamCard } from "../../../components/TeamCard/TeamCard";
import { InvitationsCard } from "../../../components/InvitationsCard/InvitationsCard";

export const Admin = () => {
  return (
    <Grid stackable stretched>
      <Grid.Row>
        <Grid.Column>
          <Heading.H2>Admin</Heading.H2>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns="equal">
        <Grid.Column>
          <DashboardCard title="Projects">
            <p>List of your projects</p>
          </DashboardCard>
        </Grid.Column>

        <Grid.Column>
          <TeamCard />
        </Grid.Column>

      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <InvitationsCard />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}