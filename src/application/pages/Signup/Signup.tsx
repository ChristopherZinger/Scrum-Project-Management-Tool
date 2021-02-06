
import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar/Navbar/Navbar";
import { Grid, Image } from "semantic-ui-react";
import { HoverStyleButton } from "../../atoms/Buttons/HoverStyleButton";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";
import signupImg from "../../images/mobile_life.svg";
import styled from "styled-components";
import { Input, Checkbox } from "../../atoms/Inputs/Input";
import { decorativeFont, Heading } from "../../atoms/style";
import { Formik, Form } from "formik";
import { ToggleSignupType } from "./ToggleSignupType/ToggleSignupType";

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

export const Signup = () => {
    const [isOfficeAdmin, setIsOfficeAdmin] = useState(false);

    useEffect(() => {
        console.log(isOfficeAdmin)
    })

    return (
        <MarginWrapper>
            <Navbar />
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Heading.h1 style={{
                            textAlign: "center",
                            fontFamily: decorativeFont,
                        }}>Create Account.</Heading.h1>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={16}>
                        <ToggleSignupType isAdmin={isOfficeAdmin} click={() => setIsOfficeAdmin(!isOfficeAdmin)} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column only="computer" computer={8}  >
                        <Image style={{ left: "50%", transform: "translate(-50%)" }} size="large" src={signupImg} />
                    </Grid.Column>

                    <Grid.Column mobile={16} computer={8} >
                        <AuthFormWrapper>
                            <Formik
                                initialValues={{ email: "", password: "", passwordRepeat: "", signupAsOfficeOwner: false }}
                                onSubmit={(values) => console.log(values)}
                            >
                                {({ handleChange }) => (
                                    <Form>
                                        <div style={{ marginBottom: "50px" }}>
                                            <label>Email</label>
                                            <Input name="email" placeholder="eg: tom@myarchoffice.com" type="text" />
                                        </div>

                                        <div style={{ marginBottom: "50px" }}>
                                            <label>Password</label>
                                            <Input name="password" type="password" />
                                        </div>

                                        <div style={{ marginBottom: "50px" }}>
                                            <label>Repeat Password</label>
                                            <Input name="passwordRepeat" type="password" />
                                        </div>

                                        <div style={{ marginBottom: "50px" }}>
                                            <Checkbox name="signupAsOfficeOwner" labelText="Terms and conditions" />
                                        </div>

                                        <HoverStyleButton type="submit" text="Sign Up" />
                                    </Form>

                                )}
                            </Formik>
                        </AuthFormWrapper>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </MarginWrapper>
    )
}