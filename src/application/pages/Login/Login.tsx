import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Grid, Divider } from "semantic-ui-react";
import { HoverStyleButton } from "../../atoms/Buttons/HoverStyleButton";
import { MarginWrapper } from "../../atoms/MarginWrapper/MarginWrapper";

export const Login = () => {
    return (
        <MarginWrapper>
            <Navbar />
            <Grid>
                <Grid.Row>


                </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={3} computer={3}>
                        <HoverStyleButton text="Get Started" />
                    </Grid.Column >
                </Grid.Row>
            </Grid>
        </MarginWrapper>
    )
}