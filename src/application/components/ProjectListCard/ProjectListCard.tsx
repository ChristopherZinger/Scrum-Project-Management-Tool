import React, { useState } from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { Modal } from "../../atoms/Modal/Modal";
import { Input, InputError } from "../../atoms/Inputs/Input";
import { Grid } from "semantic-ui-react";
import { Formik, Form } from "formik";
import { useCreateProjectMutation } from "../../../types.d";


export const ProjectListCard = () => {
  const [addProjectIsOpen, setAddProjectIsOpen] = useState(false);
  const [createProject, createProjecResult] = useCreateProjectMutation();

  return (
    <>
      <DashboardCard title="Projects:">
        <button onClick={() => setAddProjectIsOpen(true)}> create project </button>

      </DashboardCard>

      <Modal open={addProjectIsOpen} >
        <Modal.Header>
          Add Team Member
        </Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={{ pid: "", title: "" }}
            onSubmit={async (values) => {
              try {
                const newProject = await createProject({
                  variables: {
                    data: {
                      title: values.title,
                      pid: values.pid
                    }
                  }
                })
                console.log(newProject)
                setAddProjectIsOpen(false)
              } catch (err) {
                console.log(err)
              }

            }}
          >
            {() =>
              <Form id="create-project-form">
                <Grid>
                  <Grid.Row columns="equal">
                    <Grid.Column>
                      <div style={{ marginBottom: "50px" }}>
                        <label>Projec Title</label>
                        <Input name="title" type="text" />
                        <InputError name="title" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>Identification Number</label>
                        <Input name="pid" type="text" />
                        <InputError name="pid" />
                      </div>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
              </Form>
            }
          </Formik>

        </Modal.Content>
        <Modal.Actions>
          <button type="submit" form="create-project-form">
            Create
          </button>
          <button onClick={() => setAddProjectIsOpen(false)}>
            Cancel
          </button>
        </Modal.Actions>

      </Modal>
    </>
  )
}



