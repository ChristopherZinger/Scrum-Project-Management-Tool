
import React, { useContext } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Grid, Image } from "semantic-ui-react";
import { HoverStyleButton } from "../../atoms/Buttons/HoverStyleButton";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";
import signupImg from "../../images/mobile_life.svg";
import { Input, InputError } from "../../atoms/Inputs/Input";
import { decorativeFont, Heading } from "../../atoms/style";
import { Formik, Form } from "formik";
import { useRegisterWithInvitationMutation, useTeammateInvitationDataQuery } from "../../../types.d";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AuthFormWrapper } from "./styledElements/AuthFormWrapper";
import { Routes } from "../AppRoutes";
import { UserAuthDispatchContext } from "../../../App";

interface IParams { token: string, companyId: string }
interface Props extends RouteComponentProps<IParams> { }

export const RegisterWithInvitation = (props: Props) => {
  const [register, { loading }] = useRegisterWithInvitationMutation();
  const dispatch = useContext(UserAuthDispatchContext);
  const companyId = parseInt(props.match.params.companyId);
  const invitationData = useTeammateInvitationDataQuery({
    variables: { companyId }
  });
  const history = useHistory();


  const SignupValidationSchema = Yup.object().shape({
    password: Yup.string().required("Required"),
    passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

  return (
    <MarginWrapper>
      <Navbar />
      {invitationData.data && (
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Heading.H1 style={{
                textAlign: "center",
                fontFamily: decorativeFont,
              }}>You were invited by {" "}
                {invitationData.data.teammateInvitationData}
              </Heading.H1>
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
                      const { data } = await register({
                        variables: {
                          data: {
                            token: props.match.params.token,
                            password: values.password,
                            lastname: values.lastname,
                            firstname: values.firstname,
                            companyId
                          }
                        }
                      })

                      if (data) {
                        dispatch({ type: "login", user: data.registerWithInvitation })
                        history.push(Routes.DASHBOARD)
                      } else {
                        throw new Error("No data received")
                      }
                    } catch (err) {
                      console.log(err)
                    }
                  }}
                >
                  {() => {

                    return (
                      <Form id="x">
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
                          text={"Signup"}
                        />
                      </Form>
                    )
                  }}
                </Formik>
              </AuthFormWrapper>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}


    </MarginWrapper >
  )
}