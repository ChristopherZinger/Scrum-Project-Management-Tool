import React, { useState } from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { Modal } from "../../atoms/Modal/Modal";
import { Input, InputError } from "../../atoms/Inputs/Input";
import { Grid } from "semantic-ui-react";
import { Formik, Form } from "formik";
import { useInviteTeammateMutation, useTeammatesQuery } from "../../../types.d";


export const TeamCard = () => {
  const [addTeammemberIsOpen, setAddTeammemberIsOpen] = useState(false);
  const [inviteTeammate] = useInviteTeammateMutation();
  const teammates = useTeammatesQuery();

  return (
    <>
      <DashboardCard title="Team">
        <button onClick={() => setAddTeammemberIsOpen(true)}> Invite Teammember </button>
        {teammates.loading && "loading"}
        {teammates.data && (
          <>
            <h5>Users</h5>
            {teammates.data.teammates.registeredUsers.map((el, i) => <p key={`registered-${i}`}>{`
              ${el.firstname} ${el.lastname} - ${el.email}
            `}</p>)}
          </>
        )}
      </DashboardCard>

      <Modal open={addTeammemberIsOpen} >
        <Modal.Header>
          Add Team Member
        </Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={async (values) => {
              try {
                await inviteTeammate({ variables: { email: values.email } })
                await teammates.refetch();
                setAddTeammemberIsOpen(false)
              } catch (err) {
                console.log(err)
              }

            }}
          >
            {() =>
              <Form id="invitation-form">
                <Grid>
                  <Grid.Row columns="equal">
                    <Grid.Column>
                      <div style={{ marginBottom: "50px" }}>
                        <label>Email</label>
                        <Input name="email" placeholder="eg: kate@email.com" type="text" />
                        <InputError name="email" />
                      </div>
                    </Grid.Column>

                  </Grid.Row>
                </Grid>
              </Form>
            }
          </Formik>

        </Modal.Content>
        <Modal.Actions>
          <button type="submit" form="invitation-form">
            Invite
          </button>
          <button onClick={() => setAddTeammemberIsOpen(false)}>
            Cancel
          </button>
        </Modal.Actions>

      </Modal>
    </>
  )
}



