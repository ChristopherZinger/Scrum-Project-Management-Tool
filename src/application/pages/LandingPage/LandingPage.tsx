import React from "react";
import { Navbar } from "./navbar/Navbar";
import { Grid, Divider } from "semantic-ui-react";
import { GetStartedButton, BGImage, CustomDescription, Jumbotron, MarginWrapper } from "./LandingPageCustomStyledTags"

export const LandingPage = () => {
    return (
        <div>

            <MarginWrapper>
                <Navbar />
            </MarginWrapper>
            <MarginWrapper>
                <Grid>
                    <Grid.Row>
                        <Grid.Column mobile={16} tablet={10} computer={8} largeScreen={6}>
                            <Jumbotron>Welcome to Architecture Office Manager Tool</Jumbotron>
                            <CustomDescription>
                                Carry on your project better with first SCRUM based management tool made specialy for architecture offices.
                            </CustomDescription>
                        </Grid.Column>
                        <BGImage />
                    </Grid.Row>
                    <Divider hidden />
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <GetStartedButton text="Get Started" />
                        </Grid.Column >
                    </Grid.Row>
                </Grid>
            </MarginWrapper>
        </div>
    )
}