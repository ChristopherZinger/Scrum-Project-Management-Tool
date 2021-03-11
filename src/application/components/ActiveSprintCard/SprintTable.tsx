import React from "react";
import { Grid, Divider } from "semantic-ui-react"
import { Heading } from "../../../global-styles/global-styles";
import { StoryResponseType, StoryStatus } from "../../../types.d";
import { StoryListItem } from "../BacklogCard/StoryList";

export const SprintTable = (props: { stories: StoryResponseType[] }) => {
  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column>
          <Heading.H4>Sprint Table</Heading.H4>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={5}>
        <SprintColumn title="To do" stories={props.stories.filter(story => story.status === StoryStatus.Todo)} />
        <SprintColumn title="Developement" stories={props.stories.filter(story => story.status === StoryStatus.Developement)} />
        <SprintColumn title="Reivew" stories={props.stories.filter(story => story.status === StoryStatus.Review)} />
        <SprintColumn title="Testing" stories={props.stories.filter(story => story.status === StoryStatus.Test)} />
        <SprintColumn title="Done" stories={props.stories.filter(story => story.status === StoryStatus.Done)} />
      </Grid.Row>
    </Grid>
  )
}


export const SprintColumn = (props: { title: string, stories: StoryResponseType[] }) => {
  return (
    <Grid.Column>
      <Heading.H5>{props.title}</Heading.H5>
      <Divider />
      <div>
        {props.stories.map((story, i) => <StoryListItem key={story.id} story={story} />)}
      </div>
    </Grid.Column>
  )
}

