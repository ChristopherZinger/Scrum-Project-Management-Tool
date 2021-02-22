import React from "react";
import { UserProfileResponse } from "../../../types.d";

type Props = {
  user: UserProfileResponse | null;
}

export const Dashboard = (props: Props) => {


  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}