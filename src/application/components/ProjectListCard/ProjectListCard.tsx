import React, { useState } from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { Modal } from "../../atoms/Modal/Modal";
import { Input, InputError } from "../../atoms/Inputs/Input";
import { Divider, Grid, } from "semantic-ui-react";
import { Formik, Form } from "formik";
import { useCreateProjectMutation, useProjectsQuery } from "../../../types.d";
import { Link } from "react-router-dom";
import { CardButton } from "../../atoms/Buttons/CardButton";
import { CardListItem } from "../../atoms/CardListItem/CardListItem";
import { useRouteMatch } from "react-router-dom";

export const ProjectListCard = () => {
  const [addProjectIsOpen, setAddProjectIsOpen] = useState(false);
  const [createProject] = useCreateProjectMutation();
  const projects = useProjectsQuery();
  const match = useRouteMatch();

  return (
    <>
      <DashboardCard title="Projects">
        <div>
          <CardButton
            popupText="Add new project"
            iconName="plus"
            onClick={() => setAddProjectIsOpen(true)}
          />
        </div>

        <Divider hidden />

        <div>
          {projects.data && (
            <>
              {projects.data.projects.map((project) =>
                <CardListItem key={project.id} >
                  <Link to={`${match.url}/project/${project.id}`} >
                    {project.pid
                      ? project.pid + " - " + project.title
                      : project.title
                    }
                  </Link>
                </CardListItem>
              )}
            </>
          )}
        </div>
      </DashboardCard>

      <Modal open={addProjectIsOpen} onClose={() => setAddProjectIsOpen(false)} >
        <Modal.Header>
          Create new project
        </Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={{ pid: "", title: "" }}
            onSubmit={async (values) => {
              try {
                await createProject({
                  variables: {
                    data: {
                      title: values.title,
                      pid: values.pid
                    }
                  }
                })
                setAddProjectIsOpen(false)
              } catch (err) {
                console.log(err)
              }

            }}
          >
            {() =>
              <Form id="create-project-form">
                <Grid stackable>
                  <Divider hidden={true} />
                  <Grid.Row columns="equal">
                    <Grid.Column>
                      <div style={{ marginBottom: "50px" }}>
                        <label>Projec Title</label>
                        <Input name="title" type="text" />
                        <InputError name="title" />
                      </div>
                    </Grid.Column>

                    <Grid.Column>
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
          <button onClick={() => setAddProjectIsOpen(false)}>
            Cancel
          </button>
          <button type="submit" form="create-project-form">
            Create
          </button>
        </Modal.Actions>

      </Modal>
    </>
  )
}



