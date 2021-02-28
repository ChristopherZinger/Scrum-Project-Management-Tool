import React from "react";
import { Grid } from "semantic-ui-react";
import { Heading } from "../../../../global-styles/global-styles";
import { DashboardCard } from "../../../atoms/DashboardCard/DashboardCard";
import { useRemoveProjectMutation, useProjectQuery } from "../../../../types.d";
import { ButtonText } from "../../../atoms/Buttons/ButtonText";
import { useParams, useHistory } from "react-router-dom";
import { RoutesMain } from "../../AppRoutes";

export const Project = () => {
  const [removeProject, removeProjectResult] = useRemoveProjectMutation();
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const project = useProjectQuery({ variables: { projectId: parseInt(params.id, 10) } })

  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Heading.H2>Project</Heading.H2>
        </Grid.Column>
      </Grid.Row>
      {project.data && (
        <Grid.Row columns={3} stretched>

          <Grid.Column>
            <DashboardCard title={project.data.project.title}>
              <ButtonText
                text="remove"
                onClick={async () => {
                  await removeProject({ variables: { projectId: parseInt(params.id, 10) } });
                  history.push(RoutesMain.DASHBOARD)
                }}
                isLoading={removeProjectResult.loading}
              />
            </DashboardCard>
          </Grid.Column>

        </Grid.Row>
      )}
    </Grid>
  )
}