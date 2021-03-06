import React, { useContext } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Grid, /*Checkbox,*/ Image } from "semantic-ui-react";
import { HoverStyleButton } from "../../atoms/Buttons/HoverStyleButton";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";
import accessAccountImg from "../../images/access_account.svg";
import styled from "styled-components";
import { Input, InputError } from "../../atoms/Inputs/Input";
import { decorativeFont, Heading } from "../../../global-styles/global-styles";
import { useLoginMutation } from "../../../types.d";
import { Formik, Form } from "formik";
import { UserAuthDispatchContext } from "../../../App";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';

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

export const Login = () => {
  const history = useHistory();
  const [login, { loading, error }] = useLoginMutation();
  const dispatch = useContext(UserAuthDispatchContext);

  const LoginValidationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
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
              marginBottom: "50px"
            }}>Let's SCRUM!</Heading.H1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column only="computer" computer={8}  >
            <Image style={{ left: "50%", transform: "translate(-50%)" }} size="large" src={accessAccountImg} />
          </Grid.Column>

          <Grid.Column mobile={16} computer={8} >

            <AuthFormWrapper>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={LoginValidationSchema}
                onSubmit={async (values) => {
                  const { data } = await login({
                    variables: {
                      data: {
                        email: values.email,
                        password: values.password
                      }
                    }
                  })
                  if (data?.login) {
                    dispatch({ type: "login", user: data.login })
                    history.push("/")
                    toast.success("Hello! You are logged in.")
                  }
                }}>
                {({ errors, touched }) => (
                  <Form>
                    <div style={{ marginBottom: "50px" }}>
                      <label>Email</label>
                      <Input name="email" placeholder="eg: kate@email.com" type="text" />
                      <InputError name="email" />
                    </div>

                    <div style={{ marginBottom: "50px" }}>
                      <label>Password</label>
                      <Input name="password" type="password" />
                      <InputError name="password" />
                    </div>

                    <HoverStyleButton
                      type="submit"
                      text="Loading"
                      isLoading={loading}
                      disabled={loading}
                    />
                  </Form>
                )}
              </Formik>
            </AuthFormWrapper>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {error && toast.error(error.message || "Upss! Something went wrong.")}
    </MarginWrapper >
  )
}