

import React from "react";
import { DashboardCard } from "../../atoms/DashboardCard/DashboardCard";
import { useTeammatesQuery, useCancellInvitationMutation } from "../../../types.d";
import { FlexDiv } from "../../atoms/FlexDiv/FlexDiv";
import { toast } from "react-toastify";

export const InvitationsCard = () => {
  const teammates = useTeammatesQuery();
  const [cancellInvitation, cancellInvitationResult] = useCancellInvitationMutation();

  return (
    <>
      <DashboardCard title="Invitations">
        {teammates.loading && "loading"}
        {teammates.data && (
          <>
            <h5>Pending Invitations:</h5>
            {teammates.data.teammates.invitedUsers.map((email, i) => {
              return (
                <InvitationListItem
                  key={`pending-${i}`}
                  isLoading={cancellInvitationResult.loading}
                  text={email}
                  removeInvitation={async () => {
                    await cancellInvitation({ variables: { email } })
                    await teammates.refetch();
                  }} />
              )
            })}
          </>
        )}
      </DashboardCard>
    </>
  )
}




const InvitationListItem = (props: {
  removeInvitation: () => void;
  isLoading: boolean;
  text: string
}) => {
  const handleRemove = async () => {
    if (!props.isLoading) {
      try {
        await props.removeInvitation();
      } catch (err) {
        console.log(err)
        toast.error("Sorry, Something went wrong.")
      }
    }
  }

  return (
    <FlexDiv>
      <p>
        {props.text}
      </p>
      {!props.isLoading && (
        <p
          style={{ cursor: "pointer", color: "red" }}
          onClick={async () => await handleRemove()}>
          remove
        </p>
      )}
    </FlexDiv>
  )
}

