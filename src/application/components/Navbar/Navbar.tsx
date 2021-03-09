import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Divider, Grid, Icon } from "semantic-ui-react";
import { UnderlineLink } from "../../atoms/Links/UnderlineLink";
import { LogoutModal } from "../LogoutModal/LogoutModal";
import { UserAuthStateContext } from "../../../App";
import { RoutesMain } from "../../pages/AppRoutes";
import styled from "styled-components";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";
import { Heading } from "../../../global-styles/global-styles";

const Wrapper = styled.div`
    position: fixed;
    padding: 0px;
    top: 0px;
    left: 0px;
    z-index: 300;
    width: 100vw;
    min-height: 100vh;
    background-color: white;

    a{color: black }
`

const FullScreenMenu = (props: { children: React.ReactNode }) =>
    <Wrapper>
        <MarginWrapper style={{ minHeight: "100%" }}>
            {props.children}
        </MarginWrapper>
    </Wrapper>

export const Navbar = () => {
    const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
    const [mobileNavIsOn, setMobileNavIsOn] = useState(false);
    const { user } = useContext(UserAuthStateContext);

    return (
        <>
            <Grid>
                <Grid.Row only="tablet computer" style={{ marginBottom: "80px" }}>
                    <Grid.Column tablet={user ? 14 : 12} >
                        <UnderlineLink>
                            <Link to={RoutesMain.HOME}>Home</Link>
                        </UnderlineLink>
                    </Grid.Column>

                    {user ?
                        (
                            <Grid.Column width={2}>
                                <UnderlineLink>
                                    <a href={RoutesMain.HOME} onClick={() => setLogoutModalIsOpen(true)} >Logout</a>
                                </UnderlineLink>
                            </Grid.Column>
                        )
                        :
                        (
                            <>
                                <Grid.Column tablet={2} >
                                    <UnderlineLink>
                                        <Link to={RoutesMain.LOGIN}>Login</Link>
                                    </UnderlineLink>
                                </Grid.Column>

                                <Grid.Column tablet={2}>
                                    <UnderlineLink>
                                        <Link to={RoutesMain.REGISTER_PROFILE}>Signup</Link>
                                    </UnderlineLink>
                                </Grid.Column>
                            </>
                        )}
                </Grid.Row>

                <Grid.Row only="mobile" >
                    <Grid.Column>
                        <Icon name="sidebar" onClick={() => setMobileNavIsOn(!mobileNavIsOn)} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            { mobileNavIsOn && (
                <FullScreenMenu>
                    <Grid>
                        <Grid.Row only="mobile" >
                            <Grid.Column>
                                <Icon name="cancel" onClick={() => setMobileNavIsOn(!mobileNavIsOn)} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid>
                        <Divider hidden={true} />
                        {user ?
                            (
                                <Grid.Row>
                                    <Grid.Column>
                                        <Heading.H2>
                                            <span onClick={() => setLogoutModalIsOpen(true)} >Logout</span>
                                        </Heading.H2>
                                    </Grid.Column>
                                </Grid.Row>
                            )
                            :
                            (
                                <>
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Heading.H2>
                                                <Link to={RoutesMain.LOGIN}>Login</Link>
                                            </Heading.H2>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column>
                                            <Heading.H2>
                                                <Link to={RoutesMain.REGISTER_PROFILE}>Signup</Link>
                                            </Heading.H2>
                                        </Grid.Column>
                                    </Grid.Row>
                                </>
                            )}
                    </Grid>
                </FullScreenMenu>
            )}

            {logoutModalIsOpen && (
                <LogoutModal
                    close={() => setLogoutModalIsOpen(false)}
                />
            )}
        </>
    )
}

