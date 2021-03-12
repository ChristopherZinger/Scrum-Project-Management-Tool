import React, { useContext, useState } from "react";
import { ProjectQuery, StoryResponseType, useUpdateStoryMutation, StoryStatus, useRemoveStoryMutation } from "../../../types.d";
import { Checkbox, Divider, Dropdown, Grid, Icon } from "semantic-ui-react";
import { Colors, Heading } from "../../../global-styles/global-styles";
import styled from "styled-components";
import { Modal } from "../../atoms/Modal/Modal";
import { Formik, Form } from "formik";
import { ProjectContext, ProjectDispatch } from "../../context/project-context/ProjectContext";
import { toast } from "react-toastify";
import { CardListItem } from "../../atoms/CardListItem/CardListItem";
import { Input } from "../../atoms/Inputs/Input";

const LabelColor = styled.div`
  transform: translateY(4px);
  display: block;
  position:relative;
  background-color: ${props => props.color || Colors.Palet01};
  border-radius: 50%; 
  width: 10px; 
  height: 10px;
`;

export const StoryList = (props: { stories: ProjectQuery["project"]["backlog"] }) => {
  return (
    <>
      {props.stories && (
        props.stories.map((story, i) => <StoryListItem key={i} story={story} />)
      )}
    </>
  )
}

export const StoryListItem = (props: { story: StoryResponseType }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showRemoveStoryModal, setShowRemoveStoryModal] = useState(false);
  const [removeStory, { loading, error }] = useRemoveStoryMutation();
  const dispatch = useContext(ProjectDispatch)

  return (
    <>
      <Grid >
        <Grid.Row style={{ padding: "3px 0px", cursor: "pointer" }}>
          <Grid.Column width={1}>
            <LabelColor />
          </Grid.Column>

          <Grid.Column width={12} onClick={() => setModalIsOpen(true)} >
            <CardListItem>
              {props.story.title}
            </CardListItem>
          </Grid.Column>

          <Grid.Column>
            <Icon name="cancel" color="red" onClick={() => setShowRemoveStoryModal(true)} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {
        modalIsOpen && (
          <UpdateStoryModal story={props.story} close={() => setModalIsOpen(false)} />
        )
      }
      { showRemoveStoryModal && (
        <Modal open onClose={() => setShowRemoveStoryModal(true)}>
          <Modal.Header>Remove Story</Modal.Header>
          <Modal.Content>
            <Heading.H4>Are you sure you want to remove "{props.story.title}" story?</Heading.H4>
          </Modal.Content>
          <Modal.Actions>
            <button onClick={() => setShowRemoveStoryModal(false)}>Cancel</button>
            <button
              disabled={loading}
              onClick={async () => {
                try {
                  const story = await removeStory({ variables: { storyId: props.story.id } })
                  if (story.data && dispatch) {
                    dispatch.removeStory(story.data.removeStory)
                  }
                } catch (err) {
                  toast.error(error?.message || err.message || "Ups! Something went wrong.")
                }
              }}>Remove</button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  )
}


const UpdateStoryModal = (props: { story: StoryResponseType, close: () => void }) => {
  const { project } = useContext(ProjectContext);
  const [updateStory, { loading, error }] = useUpdateStoryMutation();
  const projectDispatch = useContext(ProjectDispatch);
  const storyBelonsToActiveSprint: boolean = Boolean(props.story?.sprintId && project?.activeSprintId === props.story.sprintId)

  const initialValues: {
    status: any,
    addToActiveSprint?: boolean,
    title: string,
    description: string
  } = {
    status: props.story.status,
    title: props.story.title,
    description: props.story.description,
    addToActiveSprint: storyBelonsToActiveSprint
  };

  if (!storyBelonsToActiveSprint) {
    initialValues.addToActiveSprint = storyBelonsToActiveSprint
  }

  return (
    <Modal open onClose={props.close}>
      <Modal.Header>
        {props.story.title}
      </Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              const updatedStory = await updateStory({
                variables: {
                  data: {
                    storyId: props.story.id,
                    status: values.status,
                    addToActiveSprint: "addToActiveSprint" in values ? values.addToActiveSprint : false,
                    title: values.title,
                    description: values.description
                  }
                }
              })
              if (updatedStory.data && projectDispatch) {
                projectDispatch.updateStory(updatedStory.data.updateStory)
              }
            } catch (err) {
              toast.error(error?.message || err.message || "Ups! Something went wrong.")
            }
            props.close();
          }}
        >

          {({ values, setFieldValue }) => {
            const storyStatusDropdownOptions = Object.keys(StoryStatus).map(key => ({
              key: key, value: StoryStatus[key as keyof typeof StoryStatus], text: key
            }))

            return (
              <Form id="update-story-form">
                <Grid stackable>
                  <Divider hidden={true} />

                  <Grid.Row>
                    <Grid.Column width={6}>
                      {!storyBelonsToActiveSprint && (
                        <Checkbox
                          label={{ children: "Add to active sprint" }}
                          name="addToActiveSprint"
                          onChange={(_, { name, checked }) => {
                            if (name) {
                              setFieldValue(name, !!checked)
                            } else {
                              throw new Error("Missing field name during update")
                            }
                          }}
                          checked={values.addToActiveSprint}
                        />
                      )}
                    </Grid.Column>
                  </Grid.Row>

                  <Divider hidden={true} />

                  <Grid.Row>
                    <Grid.Column computer={10}>
                      <Dropdown
                        name="status"
                        fluid
                        selection
                        onChange={(_, data) => {
                          if (data.name) {
                            setFieldValue(data.name, data.value)
                          } else {
                            throw new Error("Missing field name during update")
                          }
                        }}
                        options={storyStatusDropdownOptions}
                        defaultValue={props.story.status} />
                    </Grid.Column>
                  </Grid.Row>

                  <Divider hidden={true} />

                  <Grid.Row>
                    <Grid.Column computer={10}>
                      <label htmlFor="title">Title</label>
                      <Input name="title" />
                    </Grid.Column>
                  </Grid.Row>

                  <Divider hidden={true} />

                  <Grid.Row>
                    <Grid.Column computer={10}>
                      <label htmlFor="description">description</label>
                      <Input name="description" />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>



              </Form>
            )
          }}
        </Formik>
      </Modal.Content>
      <Modal.Actions>
        <button
          onClick={() => props.close()}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          form="update-story-form"
          disabled={loading}
        >
          Update
      </button>
      </Modal.Actions>
    </Modal>
  )
}

