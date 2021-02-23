import React, { useState } from "react";
import { DashboardCard } from "../../../atoms/DashboardCard/DashboardCard";
import { Modal } from "../../../atoms/Modal/Modal";
import { Input, InputError } from "../../../atoms/Inputs/Input";
import { Grid } from "semantic-ui-react";
import { Formik, Form } from "formik";

export const TeamTile = () => {
  const [addTeammemberIsOpen, setAddTeammemberIsOpen] = useState(false);

  return (
    <>
      <DashboardCard title="Team">
        <button onClick={() => setAddTeammemberIsOpen(true)}> Invite Teammember </button>
        <p>List of your team members</p>
      </DashboardCard>

      <Modal open={addTeammemberIsOpen}>
        <Modal.Header>
          Add Team Member
        </Modal.Header>
        <Modal.Content>
          <Formik
            initialValues={{ email: "", firstname: "", lastname: "" }}
            onSubmit={(values) => {
              console.log(values)
              setAddTeammemberIsOpen(false)
            }}
          >
            {() =>
              <Form id="foo">
                <Grid>
                  <Grid.Row columns="equal">
                    <Grid.Column>
                      <div style={{ marginBottom: "50px" }}>
                        <label>First Name</label>
                        <Input
                          name="firstname"
                          type="text" />
                        <InputError name="firstname" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>Last Name</label>
                        <Input name="lastname" type="text" />
                        <InputError name="lastname" />
                      </div>
                    </Grid.Column>

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
          <button type="submit" form="foo">
            okay
          </button>
        </Modal.Actions>

      </Modal>
    </>
  )
}