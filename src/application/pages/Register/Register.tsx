
import React, { useState, useContext } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Grid, Image } from "semantic-ui-react";
import { HoverStyleButton } from "../../atoms/Buttons/HoverStyleButton";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";
import signupImg from "../../images/mobile_life.svg";
import styled from "styled-components";
import { Input, InputError } from "../../atoms/Inputs/Input";
import { decorativeFont, Heading } from "../../atoms/style";
import { Formik, Form } from "formik";
import { ToggleRegisterType } from "./ToggleRegisterType/ToggleRegisterType";
import { useRegisterMutation } from "../../../types.d";
import { UserAuthDispatchContext } from "../../../App";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const CenteredDiv = styled.div`
display:block;
position:relative;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
`

const AuthFormWrapper = styled(CenteredDiv)`
    max-width: 400px;
`

export const Register = () => {
  const [isOfficeAdmin, setIsOfficeAdmin] = useState(false);
  const dispatch = useContext(UserAuthDispatchContext);
  const [register, { loading, error }] = useRegisterMutation();
  const history = useHistory();

  const SignupValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required("Required"),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  return (
    <MarginWrapper>
      <Navbar />
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Heading.H1 style={{
              textAlign: "center",
              fontFamily: decorativeFont,
            }}>Create Account.</Heading.H1>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <ToggleRegisterType isAdmin={isOfficeAdmin} click={() => setIsOfficeAdmin(!isOfficeAdmin)} />
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
                  email: "",
                  password: "",
                  passwordRepeat: "",
                  signupAsOfficeOwner: false,
                  firstname: "",
                  lastname: ""
                }}
                validationSchema={SignupValidationSchema}
                onSubmit={async (values) => {
                  if (values.password !== values.passwordRepeat) {
                    toast.error("Repeat the same password twice.")
                    return;
                  }

                  try {
                    const userData = await register({
                      variables: {
                        data: {
                          password: values.password,
                          email: values.email,
                          lastname: values.lastname,
                          firstname: values.firstname
                        }
                      }
                    })
                    if (userData.data) {
                      dispatch({ type: "login", user: userData.data.register })
                      history.push("/")
                    } else {
                      throw new Error("No data received")
                    }
                  } catch (err) {
                    if (error?.graphQLErrors) {
                      for (const gqlError of error.graphQLErrors) {
                        if (!gqlError.extensions?.code) {
                          continue
                        };

                        switch (gqlError.extensions.code) {
                          case "EMAIL_IS_TAKEN":
                            toast.error("This email is already taken");
                            break;

                          case "ARGUMENT_VALIDATION_ERROR":
                            if (gqlError.extensions.type === "ArgumentValidationError") {
                              const inputErrors = gqlError.extensions.inputErrors;
                              for (const inputError of inputErrors) {
                                for (const key in inputError.constraints) {
                                  toast.error(inputError.constraints[key])
                                }
                              }
                            }
                            break;

                          default:
                            toast.error("Something went wrong.")
                            break;
                        }
                      }
                    } else {
                      toast.error("Something went wrong.")
                    }
                  }
                }}
              >
                {({ errors, touched }) => {

                  return (
                    <Form>
                      <div style={{ marginBottom: "50px" }}>
                        <label>First Name</label>
                        <Input name="firstname" placeholder="eg: John" type="text" />
                        <InputError name="firstname" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>Last Name</label>
                        <Input name="lastname" placeholder="eg: Doe" type="text" />
                        <InputError name="lastname" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>Email</label>
                        <Input name="email" placeholder="eg: tom@myarchoffice.com" type="text" />
                        <InputError name="email" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>Password</label>
                        <Input name="password" type="password" />
                        <InputError name="password" />
                      </div>

                      <div style={{ marginBottom: "50px" }}>
                        <label>Repeat Password</label>
                        <Input name="passwordRepeat" type="password" />
                        <InputError name="passwordRepeat" />
                      </div>

                      <HoverStyleButton disabled={!loading} isLoading={loading} type="submit" text="Signup" />
                    </Form>
                  )
                }}
              </Formik>
            </AuthFormWrapper>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MarginWrapper >
  )
}