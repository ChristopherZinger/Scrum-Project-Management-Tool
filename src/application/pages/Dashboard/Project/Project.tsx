import React, { useContext, useState } from "react";
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
import { toast } from "react-toastify";
import { Modal } from "../../../atoms/Modal/Modal";

export const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeProject, { loading, error }] = useRemoveProjectMutation();
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const { project } = useContext(ProjectContext)

  return (
    <>
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
                    onClick={() => setIsModalOpen(true)}
                    isLoading={loading}
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
      { isModalOpen && (
        <Modal open onClose={() => setIsModalOpen(false)}>
          <Modal.Header>
            Remove Project
          </Modal.Header>
          <Modal.Content>
            <Heading.H4>Are you sure you want to remove project: {project?.title}</Heading.H4>
            <p>All information about sprints and stories  will be erased.</p>
          </Modal.Content>
          <Modal.Actions>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button onClick={async () => {
              try {
                await removeProject({ variables: { projectId: parseInt(params.id, 10) } });
                history.push(RoutesMain.DASHBOARD)
              } catch (err) {
                toast.error(error?.message || err.message || "Ups! Something went wrong")
              }
            }}>Remove</button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  )
}