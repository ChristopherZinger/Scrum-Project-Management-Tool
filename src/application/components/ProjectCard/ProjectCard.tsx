import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ProjectQuery, useRemoveProjectMutation } from "../../../types.d";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { CardButton } from "../../atoms/Buttons/CardButton";
import { Modal } from "../../atoms/Modal/Modal";
import { Heading } from "../../../global-styles/global-styles";
import { toast } from "react-toastify";
import { RoutesMain } from "../../pages/AppRoutes";

export const ProjectCard = (props: { project: ProjectQuery["project"] }) => {

  return (

    <DashboardCard title="Backlog">
      <RemoveProjectButton project={props.project} />
      <EditProjectButton project={props.project} />
    </DashboardCard>
  )
}

const RemoveProjectButton = (props: { project: ProjectQuery["project"] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [removeProject, { loading, error }] = useRemoveProjectMutation();
  return (
    <>
      <CardButton
        popupText="Remove this project"
        iconName="cancel"
        onClick={() => setIsModalOpen(true)}
      />

      { isModalOpen && (
        <Modal open onClose={() => setIsModalOpen(false)}>
          <Modal.Header>
            Remove Project
        </Modal.Header>
          <Modal.Content>
            <Heading.H4>Are you sure you want to remove project: {props.project.title}</Heading.H4>
            <p>All information about sprints and stories  will be erased.</p>
          </Modal.Content>
          <Modal.Actions>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button
              disabled={loading}
              onClick={async () => {
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

const EditProjectButton = (props: { project: ProjectQuery["project"] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <CardButton
        popupText="Edit this project"
        iconName="pencil alternate"
        onClick={() => setIsModalOpen(true)}
      />
      { isModalOpen && (
        <Modal open onClose={() => setIsModalOpen(false)} >
          <Modal.Header>Edit project</Modal.Header>
          <Modal.Content>

          </Modal.Content>
          <Modal.Actions>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button >Update</button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  )
}