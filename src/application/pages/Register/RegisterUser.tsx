
import React, { useState, useContext } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Grid, Image } from "semantic-ui-react";
import { HoverStyleButton } from "../../atoms/Buttons/HoverStyleButton";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";
import signupImg from "../../images/mobile_life.svg";
import { Input, InputError } from "../../atoms/Inputs/Input";
import { decorativeFont, Heading } from "../../../global-styles/global-styles";
import { Formik, Form } from "formik";
import { useRegisterMutation } from "../../../types.d";
import { UserAuthDispatchContext } from "../../../App";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AuthFormWrapper } from "./styledElements/AuthFormWrapper";
import { RoutesMain } from "../AppRoutes";
import { Underlineable } from "../../atoms/Underlineable/Underlineable";
import { Checkbox } from "semantic-ui-react";
import styled from "styled-components";

export const RegisterUser = () => {
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
                      history.push(isOfficeAdmin ? RoutesMain.REGISTER_COMPANY : RoutesMain.DASHBOARD)
                    } else {
                      throw new Error("Server did't respond.")
                    }
                  } catch (err) {
                    toast.error(error?.message || err.message || "Ups! Registration failed. Try again later.")
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

                      <HoverStyleButton
                        disabled={!loading}
                        isLoading={loading}
                        type="submit"
                        text={isOfficeAdmin ? "Next" : "Signup"}
                      />
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

const Wrapper = styled.div`
    display: flex;
    justify-content: center;

    p {
        font-size: 20px
    }
`

type Props = {
  isAdmin: boolean;
  click: () => void;
}

const ToggleRegisterType = (props: Props) => {
  return (
    <Wrapper>
      <p>I am a &nbsp;</p>
      <Underlineable text=" office owner or administrator" underline={props.isAdmin} underlineStyle={{ bottom: "20px" }} />

      <Checkbox
        slider
        name="isOfficeAdmin" checked={props.isAdmin}
        onClick={props.click}
        style={{ margin: "0px 20px" }}
      />

      <p>I am a &nbsp;</p>
      <Underlineable text="team member" underline={!props.isAdmin} underlineStyle={{ bottom: "20px" }} />
    </Wrapper>
  )
}