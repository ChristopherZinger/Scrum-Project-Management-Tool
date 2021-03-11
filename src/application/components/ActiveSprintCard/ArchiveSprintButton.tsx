import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { CardButton } from "../../atoms/Buttons/CardButton";
import { Modal } from "../../atoms/Modal/Modal";
import { ProjectDispatch } from "../../context/project-context/ProjectContext";
import { useArchiveActiveSprintMutation, ProjectQuery } from "../../../types.d";
import { Heading } from "../../../global-styles/global-styles";


export const ArchiveSprintButton = (props: { project: ProjectQuery["project"] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [archiveActiveSprint, { loading, error }] = useArchiveActiveSprintMutation();
  const projectDispatch = useContext(ProjectDispatch)

  return (
    <>
      <CardButton
        popupText="Finish curretn sprint"
        iconName="paper plane"
        onClick={() => setIsModalOpen(true)}
      />
      { isModalOpen && (
        <Modal open onClose={() => setIsModalOpen(false)} >
          <Modal.Header>Archive Sprint</Modal.Header>
          <Modal.Content>
            <Heading.H4>Are you sure you want to archive this sprint?</Heading.H4>
          </Modal.Content>
          <Modal.Actions>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button disabled={loading} onClick={async () => {
              try {
                const sprint = await archiveActiveSprint({ variables: { projectId: props.project.id } })
                if (sprint.data && projectDispatch) {
                  projectDispatch.archiveSprint(sprint.data.archiveActiveSprint)
                  setIsModalOpen(false);
                }
              } catch (err) {
                toast.error(error?.message || err.message || "Ups! something went wrong.")
              }
            }}>Archive</button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  )
}