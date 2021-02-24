import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { UnderlineLink } from "../../atoms/Links/UnderlineLink";
import { LogoutModal } from "../LogoutModal/LogoutModal";
import { UserAuthStateContext } from "../../../App";
import { Routes } from "../../pages/AppRoutes";

export const Navbar = () => {
    const [logoutModalIsOpen, setLogoutModalIsOpen] = useState(false);
    const { user } = useContext(UserAuthStateContext);


    return (
        <Grid>
            <Grid.Row only="tablet computer" style={{ marginBottom: "80px" }}>
                <Grid.Column tablet={user ? 14 : 12} >
                    <UnderlineLink>
                        <Link to={Routes.HOME}>Home</Link>
                    </UnderlineLink>
                </Grid.Column>

                {user ?
                    (
                        <Grid.Column width={2}>
                            <UnderlineLink>
                                <a href={Routes.HOME} onClick={() => setLogoutModalIsOpen(true)} >Logout</a>
                            </UnderlineLink>
                        </Grid.Column>
                    )
                    :
                    (
                        <>
                            <Grid.Column tablet={2} >
                                <UnderlineLink>
                                    <Link to={Routes.LOGIN}>Login</Link>
                                </UnderlineLink>
                            </Grid.Column>

                            <Grid.Column tablet={2}>
                                <UnderlineLink>
                                    <Link to={Routes.REGISTER_PROFILE}>Signup</Link>
                                </UnderlineLink>
                            </Grid.Column>
                        </>
                    )}




            </Grid.Row>
            { logoutModalIsOpen && (
                <LogoutModal
                    close={() => setLogoutModalIsOpen(false)}
                />
            )}
        </Grid>
    )
}


