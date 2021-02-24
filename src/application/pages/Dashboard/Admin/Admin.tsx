import React from "react";
import { Grid } from "semantic-ui-react";
import { DashboardCard } from "../../../atoms/DashboardCard/DashboardCard";
import { Heading } from "../../../atoms/style";
import { TeamTile } from "./TeamTile";

export const Admin = () => {
  return (
    <Grid stackable>
      <Grid.Row>
        <Heading.H2>Admin</Heading.H2>
      </Grid.Row>

      <Grid.Row columns="equal">
        <Grid.Column>
          <DashboardCard title="Projects">
            <p>List of your projects</p>
          </DashboardCard>
        </Grid.Column>

        <Grid.Column>
          <TeamTile />
        </Grid.Column>

      </Grid.Row>
    </Grid>
  )
}