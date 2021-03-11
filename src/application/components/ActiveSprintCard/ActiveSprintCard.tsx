import React from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { ProjectQuery } from "../../../types.d";
import dayjs from "dayjs";
import { Colors } from "../../../global-styles/global-styles";
import styled from "styled-components";
import { SprintTable } from "./SprintTable";
import { CreateSprintButton } from "./CreateSprintButton";
import { ArchiveSprintButton } from "./ArchiveSprintButton";

type Props = {
  project: ProjectQuery["project"]
}

export const ActiveSprintCard = (props: Props) => {
  return (
    <>
      <DashboardCard title="Active Sprint">
        <div>
          {props.project.activeSprint ?
            <ArchiveSprintButton project={props.project} />
            :
            <CreateSprintButton project={props.project} />
          }
        </div>

        <div>
          <ActiveSprint project={props.project} />
        </div>
      </DashboardCard>
    </>
  )
}

const InfoPanel = styled.div`
  font-size: 14px;
  color: ${Colors.UI05};
  margin: 10px 0px;
  p {
    display: inline-block;
    margin-right: 20px;
  }
`

const ActiveSprint = (props: Props) => {

  const activeStories = props.project.backlog?.filter(story => {
    if (!story.sprintId) return false;
    return story.sprintId === props.project.activeSprintId
  })

  return (
    <>
      {
        props.project.activeSprint
          ?
          <>
            <InfoPanel>
              <p> {dayjs(props.project.activeSprint?.startsAt).format("dddd - D MMMM")}</p>
              <p>to</p>
              <p> {dayjs(props.project.activeSprint?.endsAt).format("dddd - D MMMM")}</p>
            </InfoPanel>
            <SprintTable stories={activeStories || []} />
          </>
          :
          <>
            <p style={{ color: Colors.UI05, fontSize: "14px", margin: "10px 0px", textAlign: "center" }}>This project doesn't have a active sprint at the moment.</p>
          </>
      }
    </>
  )
}



