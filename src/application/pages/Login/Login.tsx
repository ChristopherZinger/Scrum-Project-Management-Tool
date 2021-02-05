import React, { useContext } from "react";
import { Navbar } from "../../components/Navbar/Navbar/Navbar";
import { Grid, Checkbox, Image } from "semantic-ui-react";
import { HoverStyleButton } from "../../atoms/Buttons/HoverStyleButton";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";
import accessAccountImg from "../../images/access_account.svg";
import styled from "styled-components";
import { Input } from "../../atoms/Inputs/Input";
import { decorativeFont, Heading } from "../../atoms/style";
import { useLoginMutation } from "../../../types.d";
import { Formik, Form } from "formik";
import { UserAuthDispatchContext } from "../../../App";
import { useHistory } from "react-router-dom";

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
    const [login] = useLoginMutation();
    const dispatch = useContext(UserAuthDispatchContext);

    return (
        <MarginWrapper>
            <Navbar />
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Heading.h1 style={{
                            textAlign: "center",
                            fontFamily: decorativeFont,
                            marginBottom: "50px"
                        }}>Let's SCRUM!</Heading.h1>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column centered only="computer" computer={8}  >
                        <Image style={{ left: "50%", transform: "translate(-50%)" }} size="large" src={accessAccountImg} />
                    </Grid.Column>

                    <Grid.Column mobile={16} computer={8} >
                        <AuthFormWrapper>
                            <Formik
                                initialValues={{ email: "", password: "" }}
                                onSubmit={async (values) => {
                                    try {
                                        const { data } = await login({
                                            variables: {
                                                data: {
                                                    email: values.email,
                                                    password: values.password
                                                }
                                            }
                                        })
                                        dispatch({ type: "login", user: data?.login })
                                        history.push("/")
                                    } catch (err) {
                                        console.log(err)
                                    }
                                }}
                            >
                                <Form>


                                    <div style={{ marginBottom: "50px" }}>
                                        <label>Email</label>
                                        <Input name="email" placeholder="eg: kate@email.com" type="text" />
                                    </div>

                                    <div style={{ marginBottom: "50px" }}>
                                        <label>Password</label>
                                        <Input name="password" type="password" />
                                    </div>

                                    <div style={{ marginBottom: "50px" }}>
                                        <Checkbox label='Keep me signed in' />
                                    </div>

                                    <HoverStyleButton type="submit" text="Login" />
                                </Form>
                            </Formik>
                        </AuthFormWrapper>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </MarginWrapper >
    )
}