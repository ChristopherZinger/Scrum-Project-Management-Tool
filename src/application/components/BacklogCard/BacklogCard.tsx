

import React, { useState, useContext } from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { useCreateStoryMutation, ProjectQuery, StoryStatus } from "../../../types.d";
import { Modal } from "../../atoms/Modal/Modal";
import { Formik, Form } from "formik";
import { Input } from "../../atoms/Inputs/Input";
import { Grid, Divider } from "semantic-ui-react";
import { CardButton } from "../../atoms/Buttons/CardButton";
import { StoryList } from "./StoryList";
import { ProjectDispatch } from "../../context/project-context/ProjectContext";

type Props = {
  project: ProjectQuery["project"]
}

export const BacklogCard = (props: Props) => {
  const dispatch = useContext(ProjectDispatch)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [createStory] = useCreateStoryMutation();

  return (
    <>
      <DashboardCard title="Backlog">
        <CardButton
          popupText="Add new story to the backlog"
          iconName="plus"
          onClick={() => setModalIsOpen(true)}
        />
        <Divider hidden={true} />

        <StoryList stories={props.project.backlog?.filter(story => story.status === StoryStatus.Backlog)} />
      </DashboardCard>

      {modalIsOpen && (
        <Modal open onClose={() => setModalIsOpen(false)} >
          <Modal.Header>
            Create new story
          </Modal.Header>

          <Modal.Content>
            <Formik
              initialValues={{ title: "", description: "" }}
              onSubmit={async (values) => {

                const newStory = await createStory({
                  variables: {
                    data: {
                      title: values.title,
                      description: values.description,
                      projectId: props.project.id
                    }
                  }
                })
                if (newStory.data && dispatch) {
                  dispatch.createStory(newStory.data.createStory)
                }
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




