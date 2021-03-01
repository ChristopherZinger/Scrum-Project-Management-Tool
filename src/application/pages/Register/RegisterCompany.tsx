import React from "react";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";
import { Grid, Image } from "semantic-ui-react";
import { Navbar } from "../../components/Navbar/Navbar";
import { decorativeFont, Heading } from "../../../global-styles/global-styles";
import signupImg from "../../images/mobile_life.svg";
import { AuthFormWrapper } from "./styledElements/AuthFormWrapper";
import { Formik, Form } from "formik";
import { Input, InputError } from "../../atoms/Inputs/Input";
import { HoverStyleButton } from "../../atoms/Buttons/HoverStyleButton";
import { useRegisterCompanyMutation } from "../../../types.d";
import { useHistory } from "react-router-dom";
import { RoutesMain } from "../AppRoutes";

export const RegisterCompany = () => {
  const history = useHistory();
  const [registerCompany, { loading }] = useRegisterCompanyMutation();
  return (
    <MarginWrapper>
      <Navbar />
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Heading.H1 style={{
              textAlign: "center",
              fontFamily: decorativeFont,
            }}>Add Yours Company Information</Heading.H1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column only="computer" computer={8}  >
            <Image style={{ left: "50%", transform: "translate(-50%)" }} size="large" src={signupImg} />
          </Grid.Column>

          <Grid.Column mobile={16} computer={8} >
            <AuthFormWrapper>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  city: "",
                  street: "",
                  buildingNumber: "",
                  zipCode: "",
                }}
                // validationSchema={}
                onSubmit={async (values) => {
                  try {
                    registerCompany({
                      variables: {
                        data: {
                          name: values.name,
                          email: values.email,
                          city: values.city,
                          street: values.street,
                          buildingNumber: values.buildingNumber,
                          zipCode: values.zipCode,
                        }
                      }
                    })

                    history.push(RoutesMain.DASHBOARD)
                  } catch (err) {
                    console.log(err)
                  }
                }}
              >

                {({ errors, touched }) => {
                  return (
                    <Form>
                      <div style={{ marginBottom: "50px" }}>
                        <label>Company Name</label>
                        <Input name="name" placeholder="" type="text" />
                        <InputError name="name" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>Company Email</label>
                        <Input name="email" placeholder="eg: info@myarchoffice.com" type="text" />
                        <InputError name="email" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>City</label>
                        <Input name="city" placeholder="" type="text" />
                        <InputError name="city" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>Street</label>
                        <Input name="street" placeholder="" type="text" />
                        <InputError name="street" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>Building Nr</label>
                        <Input name="buildingNumber" placeholder="" type="text" />
                        <InputError name="buildingNumber" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>Zip Code</label>
                        <Input name="zipCode" placeholder="" type="text" />
                        <InputError name="zipCode" />
                      </div>

                      <HoverStyleButton disabled={!loading} isLoading={loading} type="submit" text="Submit" />
                    </Form>
                  )
                }}
              </Formik>
            </AuthFormWrapper>
          </Grid.Column>

        </Grid.Row>
      </Grid>
    </MarginWrapper>
  )
}