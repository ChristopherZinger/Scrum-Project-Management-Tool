import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { Heading } from "../../../../global-styles/global-styles";
import { DashboardCard } from "../../../atoms/DashboardCard/DashboardCard";
import { useRemoveProjectMutation } from "../../../../types.d";
import { ButtonText } from "../../../atoms/Buttons/ButtonText";
import { useParams, useHistory } from "react-router-dom";
import { RoutesMain } from "../../AppRoutes";
import { ActiveSprintCard } from "../../../components/ActiveSprintCard/ActiveSprintCard";
import { BacklogCard } from "../../../components/BacklogCard/BacklogCard";
import { ProjectContext } from "../../../context/project-context/ProjectContext";

export const Project = () => {
  const [removeProject, removeProjectResult] = useRemoveProjectMutation();
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { project } = useContext(ProjectContext)

  console.log(project)

  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Heading.H2>Project</Heading.H2>
        </Grid.Column>
      </Grid.Row>
      {project && (
        <>
          <Grid.Row columns={3} stretched>

            <Grid.Column>
              <DashboardCard title={project.title}>
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

            <Grid.Column>
              <BacklogCard project={project} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <ActiveSprintCard project={project} />
            </Grid.Column>
          </Grid.Row>
        </>
      )}
    </Grid>
  )
}