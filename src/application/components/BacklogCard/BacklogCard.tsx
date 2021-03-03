

import React, { useState } from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { useCreateStoryMutation, ProjectQuery } from "../../../types.d";
import { Modal } from "../../atoms/Modal/Modal";
import { Formik, Form } from "formik";
import { Input } from "../../atoms/Inputs/Input";
import { Grid, Divider } from "semantic-ui-react";

type Props = {
  project: ProjectQuery["project"]
}

export const BacklogCard = (props: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [createStory] = useCreateStoryMutation();

  return (
    <>
      <DashboardCard title="Backlog">
        <button onClick={() => setModalIsOpen(true)}>Add Story</button>
        <Divider hidden={true} />
        <div>
          {props.project.backlog?.map((story, i) =>
            <div key={i}>
              {story.title}
            </div>
          )}
        </div>
      </DashboardCard>

      {modalIsOpen && (
        <Modal open >
          <Modal.Header>
            Create new story
          </Modal.Header>

          <Modal.Content>
            <Formik
              initialValues={{ title: "", description: "" }}
              onSubmit={async (values) => {
                console.log("sub")
                await createStory({
                  variables: {
                    data: {
                      title: values.title,
                      description: values.description,
                      projectId: props.project.id
                    }
                  }
                })
                setModalIsOpen(false);
              }}
            >
              {() =>
                <Form id="story-form">
                  <Grid>
                    <Grid.Row>
                      <Grid.Column computer={8}>
                        <label htmlFor="title" >title</label>
                        <Input name="title" />

                        <Divider hidden={true} />

                        <label htmlFor="description">description</label>
                        <Input name="description" />

                        <Divider hidden={true} />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              }

            </Formik>
          </Modal.Content>

          <Modal.Actions>
            <button onClick={() => setModalIsOpen(false)} >close</button>
            <button type="submit" form="story-form" >Create</button>
          </Modal.Actions>

        </Modal>
      )}

    </>
  )
}




