import React, { useContext } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Grid, /*Checkbox,*/ Image } from "semantic-ui-react";
import { HoverStyleButton } from "../../atoms/Buttons/HoverStyleButton";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";
import accessAccountImg from "../../images/access_account.svg";
import styled from "styled-components";
import { Input, InputError } from "../../atoms/Inputs/Input";
import { decorativeFont, Heading } from "../../atoms/style";
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
                                    try {
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
                                    } catch (err) {
                                        if (error?.graphQLErrors) {
                                            for (const gqlError of error.graphQLErrors) {
                                                if (!gqlError.extensions) continue;
                                                switch (gqlError.extensions.code) {
                                                    case "WRONG_CREDENTIALS":
                                                        toast.error("Incorrect email or password.")
                                                }
                                            }
                                        } else {
                                            toast.error("Sorry, Something went wrong.")
                                        }
                                    }
                                }}>
                                {({ errors, touched }) => (
                                    <Form>
                                        <div style={{ marginBottom: "50px" }}>
                                            <label>Email</label>
                                            <Input name="email" placeholder="eg: kate@email.com" type="text" />
                                            {errors.email && touched.email ? (
                                                <InputError>* {errors.email}</InputError>
                                            ) : null}
                                        </div>

                                        <div style={{ marginBottom: "50px" }}>
                                            <label>Password</label>
                                            <Input name="password" type="password" />
                                            {errors.password && touched.password ? (
                                                <InputError>*{errors.password}</InputError>
                                            ) : null}
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
        </MarginWrapper >
    )
}