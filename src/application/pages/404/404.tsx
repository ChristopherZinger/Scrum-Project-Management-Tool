import React from "react";
import { Grid, Image } from "semantic-ui-react";
import { Heading } from "../../../global-styles/global-styles";
import image404 from "../../images/404.svg";


export const NotFound = () =>
  <div style={{ width: "100vw", height: "100vh", position: "relative", display: "block" }}>
    <Grid style={{ position: "relative", display: "block", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
      <Grid.Row centered={true} >
        <Grid.Column computer={8}>
          <Heading.H1 style={{ textAlign: "center", marginBottom: "50px" }}>Upss! page not found.</Heading.H1>
          <Image src={image404} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
