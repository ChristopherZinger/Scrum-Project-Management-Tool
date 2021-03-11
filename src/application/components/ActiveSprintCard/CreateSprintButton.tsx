import React, { useState, useContext } from "react";
import { Checkbox } from "semantic-ui-react"
import { toast } from "react-toastify";
import { CardButton } from "../../atoms/Buttons/CardButton";
import { Modal } from "../../atoms/Modal/Modal";
import { Formik, Form } from "formik";
import { ProjectDispatch } from "../../context/project-context/ProjectContext";
import { useCreateSprintMutation, ProjectQuery } from "../../../types.d";

export const CreateSprintButton = (props: { project: ProjectQuery["project"] }) => {
  const [isCreateSprintModalOpen, setIsCreateSprintModalOpen] = useState(false);
  const [createSprint, createSprintResult] = useCreateSprintMutation();
  const projectDispatch = useContext(ProjectDispatch)

  return (
    <>
      <CardButton
        popupText="Create new sprint"
        iconName="plus"
        onClick={() => setIsCreateSprintModalOpen(true)}
      />

      <Modal open={isCreateSprintModalOpen} onClose={() => setIsCreateSprintModalOpen(false)}>
        <Modal.Header>
          Create New Sprint
        </Modal.Header>

        <Modal.Content>
          <Formik
            initialValues={{ setAsActiveSprint: true }}
            onSubmit={async (values) => {
              try {
                const sprint = await createSprint({
                  variables: {
                    projectId: props.project.id,
                    setAsActiveSprint: values.setAsActiveSprint
                  }
                })
                if (sprint.data && projectDispatch) {
                  projectDispatch.createSprint(sprint.data.createSprint)
                } else {
                  throw new Error("Server response or project dispatch is missing.")
                }
              } catch (err) {
                toast.error(createSprintResult.error?.message || err.message || "Ups! Something went wrong.")
              }
              setIsCreateSprintModalOpen(false)
            }}
          >
            {({ setFieldValue, values }) =>
              <Form
                id="sprint-form"
              >
                <Checkbox
                  label={{ children: "Set as active sprint" }}
                  name="setAsActiveSprint"
                  onChange={(_, { name, checked }) => {
                    if (name) {
                      setFieldValue(name, !!checked)
                    } else {
                      throw new Error("Missing field name during update")
                    }
                  }}
                  checked={values.setAsActiveSprint}
                />
              </Form>
            }
          </Formik>

        </Modal.Content>

        <Modal.Actions>
          <button onClick={() => setIsCreateSprintModalOpen(false)}>
            Cancel
          </button>
          <button disabled={createSprintResult.loading} type="submit" form="sprint-form">
            Create
          </button>
        </Modal.Actions>
      </Modal>
    </>
  )
}