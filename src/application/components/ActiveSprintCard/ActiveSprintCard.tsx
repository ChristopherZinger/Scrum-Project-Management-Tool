import React, { useState } from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { Modal } from "../../atoms/Modal/Modal";
import { Grid, Divider } from "semantic-ui-react"
import { Formik, Field, Form } from "formik";
import { useCreateSprintMutation, useArchiveActiveSprintMutation, ProjectQuery } from "../../../types.d";
import { CardButton } from "../../atoms/Buttons/CardButton";
import dayjs from "dayjs";
import { Colors, Heading } from "../../../global-styles/global-styles";
import styled from "styled-components";

type Props = {
  project: ProjectQuery["project"]
}

export const ActiveSprintCard = (props: Props) => {
  const [isCreateSprintModalOpen, setIsCreateSprintModalOpen] = useState(false);
  const [createSprint] = useCreateSprintMutation();
  const [archiveActiveSprint] = useArchiveActiveSprintMutation();

  return (
    <>
      <DashboardCard title="Active Sprint">
        <div>


          {props.project.activeSprint ?
            <CardButton
              popupText="Finish curretn sprint"
              iconName="paper plane"
              onClick={async () => await archiveActiveSprint({ variables: { projectId: props.project.id } })}
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
                setIsCreateSprintModalOpen(false)
                console.log(sprint)
              } catch (err) {
                console.log(err)
              }
            }}
          >
            {() =>
              <Form
                id="sprint-form"
              >
                <label>Set as active sprint</label>
                <Field type="checkbox" name="setAsActiveSprint" />
              </Form>
            }
          </Formik>

        </Modal.Content>

        <Modal.Actions>
          <button onClick={() => setIsCreateSprintModalOpen(false)}>
            Cancel
          </button>
          <button type="submit" form="sprint-form">
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
            <SprintTable />
          </>
          :
          <>
            <p style={{ color: Colors.UI05, fontSize: "14px", margin: "10px 0px", textAlign: "center" }}>This project doesn't have a active sprint at the moment.</p>
          </>
      }
    </>
  )
}


const SprintTable = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Heading.H4>Sprint Table</Heading.H4>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={5} >
        <SprintColumn title="To do" />
        <SprintColumn title="Developement" />
        <SprintColumn title="Reivew" />
        <SprintColumn title="Testing" />
        <SprintColumn title="Done" />
      </Grid.Row>
    </Grid>
  )
}

const SprintColumn = (props: { title: string }) => {
  return (
    <Grid.Column>
      <Heading.H5>{props.title}</Heading.H5>
      <Divider />
    </Grid.Column>
  )
}

