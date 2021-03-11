import React, { useContext, useState } from "react";
import { ProjectQuery, StoryResponseType, useUpdateStoryMutation, StoryStatus } from "../../../types.d";
import { Checkbox, Divider, Dropdown, Grid } from "semantic-ui-react";
import { Colors } from "../../../global-styles/global-styles";
import styled from "styled-components";
import { Modal } from "../../atoms/Modal/Modal";
import { Formik, Form } from "formik";
import { ProjectDispatch } from "../../context/project-context/ProjectContext";
import { toast } from "react-toastify";

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

  return (
    <>
      <Grid >
        <Grid.Row style={{ padding: "3px 0px", cursor: "pointer" }} onClick={() => setModalIsOpen(true)}>
          <Grid.Column width={1}>
            <LabelColor />
          </Grid.Column>

          <Grid.Column width={12}>
            {props.story.title}
          </Grid.Column>

          <Grid.Column width={2}>
            .
        </Grid.Column>
        </Grid.Row>
      </Grid>
      { modalIsOpen && (
        <UpdateStoryModal story={props.story} close={() => setModalIsOpen(false)} />
      )}
    </>
  )
}


const UpdateStoryModal = (props: { story: StoryResponseType, close: () => void }) => {
  const [updateStory, { loading, error }] = useUpdateStoryMutation();
  const projectDispatch = useContext(ProjectDispatch);

  return (
    <Modal open onClose={props.close}>
      <Modal.Header>
        {props.story.title}
      </Modal.Header>
      <Modal.Content>
        <Formik
          initialValues={{ status: props.story.status, addToActiveSprint: false }}
          onSubmit={async (values) => {
            try {
              const updatedStory = await updateStory({
                variables: {
                  data: {
                    storyId: props.story.id,
                    status: values.status,
                    addToActiveSprint: values.addToActiveSprint
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
                <Divider hidden={true} />

                <div>
                  {/* //TODO checkbox should be hidden if story already belongs to active sprint */}
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
                </div>
                <Divider hidden={true} />

                <div>
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
                    defaultValue={props.story.status.toString()} />

                </div>
                <Divider hidden={true} />
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

