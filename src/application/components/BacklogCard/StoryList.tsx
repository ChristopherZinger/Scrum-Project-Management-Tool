import React, { useState } from "react";
import { ProjectQuery, StoryResponseType } from "../../../types.d";
import { Grid } from "semantic-ui-react";
import { Colors } from "../../../global-styles/global-styles";
import styled from "styled-components";
import { Modal } from "../../atoms/Modal/Modal";

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

          </Modal.Content>
          <Modal.Actions>
            <button onClick={() => setModalIsOpen(false)}>Cancel</button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  )
}


