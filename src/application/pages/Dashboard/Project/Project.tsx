import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { Heading } from "../../../../global-styles/global-styles";
import { ActiveSprintCard } from "../../../components/ActiveSprintCard/ActiveSprintCard";
import { BacklogCard } from "../../../components/BacklogCard/BacklogCard";
import { ProjectContext } from "../../../context/project-context/ProjectContext";
import { ProjectCard } from "../../../components/ProjectCard/ProjectCard";

export const Project = () => {
  const { project } = useContext(ProjectContext)

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
              <ProjectCard project={project} />
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