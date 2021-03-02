import React, { useState } from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { Modal } from "../../atoms/Modal/Modal";
import { Formik, Field, Form } from "formik";
import { useCreateSprintMutation, useArchiveActiveSprintMutation } from "../../../types.d";

type Props = {
  projectId: number
}

export const ActiveSprintCard = (props: Props) => {
  const [isCreateSprintModalOpen, setIsCreateSprintModalOpen] = useState(false);
  const [createSprint] = useCreateSprintMutation();
  const [archiveActiveSprint] = useArchiveActiveSprintMutation();

  const handleArchiveActiveSprint = async () => {
    try {
      const sprint = await archiveActiveSprint({ variables: { projectId: props.projectId } });
      console.log(sprint)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <DashboardCard title="Active Sprint">
        <button onClick={() => setIsCreateSprintModalOpen(true)}>create new sprint</button>
        <button onClick={async () => await handleArchiveActiveSprint()}>finish curretn sprint</button>
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
                    projectId: props.projectId,
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


