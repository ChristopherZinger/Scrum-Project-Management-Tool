import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Grid, Form, Checkbox, Image } from "semantic-ui-react";
import { HoverStyleButton } from "../../atoms/Buttons/HoverStyleButton";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";
import accessAccountImg from "../../images/access_account.svg";
import styled from "styled-components";
import { Input } from "../../atoms/Inputs/Input";
import { decorativeFont, Heading } from "../../atoms/style";

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
                            <Form>
                                <Form.Field style={{ marginBottom: "50px" }}>
                                    <label>Email</label>
                                    <Input placeholder="eg: kate@email.com" type="text" />
                                </Form.Field>

                                <Form.Field style={{ marginBottom: "50px" }}>
                                    <label>Password</label>
                                    <Input type="password" />
                                </Form.Field>

                                <Form.Field style={{ marginBottom: "50px" }}>
                                    <Checkbox label='Keep me signed in' />
                                </Form.Field>

                                <HoverStyleButton type="submit" text="Login" />
                            </Form>
                        </AuthFormWrapper>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </MarginWrapper>
    )
}