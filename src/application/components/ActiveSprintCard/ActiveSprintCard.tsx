import React, { useState } from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { Modal } from "../../atoms/Modal/Modal";
import { Formik, Field, Form } from "formik";
import { useCreateSprintMutation, useArchiveActiveSprintMutation, ProjectQuery } from "../../../types.d";
import { CardButton } from "../../atoms/Buttons/CardButton";

type Props = {
  project: ProjectQuery["project"]
}

export const ActiveSprintCard = (props: Props) => {
  const [isCreateSprintModalOpen, setIsCreateSprintModalOpen] = useState(false);
  const [createSprint] = useCreateSprintMutation();
  const [archiveActiveSprint] = useArchiveActiveSprintMutation();

  return (
    <>
      <DashboardCard title="Active Sprint">
        <CardButton
          popupText="Create new sprint"
          iconName="plus"
          onClick={() => setIsCreateSprintModalOpen(true)}
        />

        <CardButton
          popupText="Finish curretn sprint"
          iconName="paper plane"
          onClick={async () => await archiveActiveSprint({ variables: { projectId: props.project.id } })}
        />
      </DashboardCard>

      <Modal open={isCreateSprintModalOpen} >
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
                setIsCreateSprintModalOpen(false)
                console.log(sprint)
              } catch (err) {
                console.log(err)
              }
            }}
          >
            {() =>
              <Form
                id="sprint-form"
              >
                <label>Set as active sprint</label>
                <Field type="checkbox" name="setAsActiveSprint" />
              </Form>
            }
          </Formik>

        </Modal.Content>

        <Modal.Actions>
          <button onClick={() => setIsCreateSprintModalOpen(false)}>
            Cancel
          </button>
          <button type="submit" form="sprint-form">
            Create
          </button>
        </Modal.Actions>
      </Modal>
    </>
  )
}


