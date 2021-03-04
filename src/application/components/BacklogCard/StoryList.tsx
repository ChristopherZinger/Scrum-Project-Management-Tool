import React, { useState } from "react";
import { ProjectQuery, StoryResponseType, useUpdateStoryMutation, StoryStatus } from "../../../types.d";
import { Grid } from "semantic-ui-react";
import { Colors } from "../../../global-styles/global-styles";
import styled from "styled-components";
import { Modal } from "../../atoms/Modal/Modal";
import { Formik, Form, Field } from "formik";

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

const StoryListItem = (props: { story: StoryResponseType }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [updateStory, updateStoryResult] = useUpdateStoryMutation();

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
        <Modal open>
          <Modal.Header>
            {props.story.title}
          </Modal.Header>
          <Modal.Content>
            <Formik
              initialValues={{ status: props.story.status || "", addToActiveSprint: false }}
              onSubmit={async (values) => {

                // make sure status exists on StoryStatus
                let status = props.story.status;
                if (Object.values(StoryStatus).includes(values.status as StoryStatus)) {
                  status = values.status as StoryStatus
                }

                try {
                  const updatedStory = await updateStory({
                    variables: {
                      data: {
                        storyId: props.story.id,
                        status: status,
                        addToActiveSprint: values.addToActiveSprint
                      }
                    }
                  })
                  console.log(updatedStory)
                } catch (err) {
                  console.log(err.networkError)
                  console.log(err.graphQLErrors)
                }
                setModalIsOpen(false)
              }}
            >

              {() =>
                <Form id="update-story-form">
                  <label>Add to Active Sprint</label>
                  <Field type="checkbox" name="addToActiveSprint" />

                  <Field as="select" name="status">
                    {Object.keys(StoryStatus).map((key, i) =>
                      <option
                        key={i}
                        value={StoryStatus[key as keyof typeof StoryStatus]} >
                        {key}
                      </option>
                    )}
                    <option value="" >none </option>
                  </Field>
                </Form>
              }
            </Formik>
          </Modal.Content>
          <Modal.Actions>
            <button
              onClick={() => setModalIsOpen(false)}
              disabled={updateStoryResult.loading}
            >
              Cancel
              </button>

            <button
              type="submit"
              form="update-story-form"
              disabled={updateStoryResult.loading}
            >
              Update
            </button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  )
}


