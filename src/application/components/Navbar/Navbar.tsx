import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Modal } from "semantic-ui-react";
import { UnderlineLink } from "../../atoms/Links/UnderlineLink";
import { LogoutModal } from "../LogoutModal/LogoutModal";
import { UserAuthStateContext } from "../../../App";
import { RoutesMain } from "../../pages/AppRoutes";
import styled from "styled-components";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";

export const Navbar = () => {
    const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
    const [mobileNavIsOn, setMobileNavIsOn] = useState(false);
    const { user } = useContext(UserAuthStateContext);


    return (
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

            { mobileNavIsOn && (
                <FullScreenModal>
                    <MarginWrapper>
                        <Grid>
                            <Grid.Row only="mobile" >
                                <Icon name="sidebar" onClick={() => setMobileNavIsOn(!mobileNavIsOn)} />
                            </Grid.Row>
                            <Grid.Row>

                            </Grid.Row>
                        </Grid>
                    </MarginWrapper>
                </FullScreenModal>
            )}


            { logoutModalIsOpen && (
                <LogoutModal
                    close={() => setLogoutModalIsOpen(false)}
                />
            )}
        </Grid>
    )
}

const FullScreenModal = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 300;

    width: 100vw;
    min-height: 100vh;

    background-color: coral;
`


