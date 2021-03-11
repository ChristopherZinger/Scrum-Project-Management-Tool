import React, { useState, useContext } from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { Modal } from "../../atoms/Modal/Modal";
import { Formik, Field, Form } from "formik";
import { useCreateSprintMutation, useArchiveActiveSprintMutation, ProjectQuery } from "../../../types.d";
import { CardButton } from "../../atoms/Buttons/CardButton";
import dayjs from "dayjs";
import { Colors } from "../../../global-styles/global-styles";
import styled from "styled-components";
import { ProjectDispatch } from "../../context/project-context/ProjectContext";
import { SprintTable } from "./SprintTable";
import { Checkbox } from "semantic-ui-react"
import { toast } from "react-toastify";

type Props = {
  project: ProjectQuery["project"]
}

export const ActiveSprintCard = (props: Props) => {
  const [isCreateSprintModalOpen, setIsCreateSprintModalOpen] = useState(false);
  const [createSprint, createSprintResult] = useCreateSprintMutation();
  const [archiveActiveSprint] = useArchiveActiveSprintMutation();
  const projectDispatch = useContext(ProjectDispatch)

  return (
    <>
      <DashboardCard title="Active Sprint">
        <div>
          {props.project.activeSprint ?
            <CardButton
              popupText="Finish curretn sprint"
              iconName="paper plane"
              onClick={async () => {
                try {
                  const sprint = await archiveActiveSprint({ variables: { projectId: props.project.id } })
                  if (sprint.data && projectDispatch) {
                    projectDispatch.archiveSprint(sprint.data.archiveActiveSprint)
                  }
                } catch (err) {
                  console.log(err)
                }
              }}
            />
            :
            <CardButton
              popupText="Create new sprint"
              iconName="plus"
              onClick={() => setIsCreateSprintModalOpen(true)}
            />
          }
        </div>

        <div>
          <ActiveSprint project={props.project} />
        </div>

      </DashboardCard>

      <Modal open={isCreateSprintModalOpen} >
        <Modal.Header>
          Create New Sprint
        </Modal.Header>

        <Modal.Content>
          <Formik
            initialValues={{ setAsActiveSprint: true }}
            onSubmit={async (values) => {
              try {
                const sprint = await createSprint({
                  variables: {
                    projectId: props.project.id,
                    setAsActiveSprint: values.setAsActiveSprint
                  }
                })
                if (sprint.data && projectDispatch) {
                  projectDispatch.createSprint(sprint.data.createSprint)
                } else {
                  throw new Error("Server response or project dispatch is missing.")
                }
              } catch (err) {
                toast.error(createSprintResult.error?.message || err.message || "Ups! Something went wrong.")
              }
              setIsCreateSprintModalOpen(false)
            }}
          >
            {({ setFieldValue, values }) =>
              <Form
                id="sprint-form"
              >
                <Checkbox
                  label={{ children: "Set as active sprint" }}
                  name="setAsActiveSprint"
                  onChange={(_, { name, checked }) => {
                    if (name) {
                      setFieldValue(name, !!checked)
                    } else {
                      throw new Error("Missing field name during update")
                    }
                  }}
                  checked={values.setAsActiveSprint}
                />
              </Form>
            }
          </Formik>

        </Modal.Content>

        <Modal.Actions>
          <button onClick={() => setIsCreateSprintModalOpen(false)}>
            Cancel
          </button>
          <button disabled={!createSprintResult.loading} type="submit" form="sprint-form">
            Create
          </button>
        </Modal.Actions>
      </Modal>
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



