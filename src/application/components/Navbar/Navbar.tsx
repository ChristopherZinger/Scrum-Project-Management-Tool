import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { UnderlineLink } from "../../atoms/Links/UnderlineLink";


export const Navbar = () => {
    return (
        <Grid>
            <Grid.Row only="tablet computer" style={{ marginBottom: "80px" }}>
                <Grid.Column tablet={12} >
                    <UnderlineLink>
                        <Link to="/">Home</Link>
                    </UnderlineLink>
                </Grid.Column>
                {/* <Grid.Column width={1}>
                        <Link to="/logout" >Logout</Link>
                    </Grid.Column> */}
                <Grid.Column tablet={2} >
                    <UnderlineLink>
                        <Link to="/login">Login</Link>
                    </UnderlineLink>
                </Grid.Column>
                <Grid.Column tablet={2}>
                    <UnderlineLink>
                        <Link to="/signup">Signup</Link>
                    </UnderlineLink>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}


