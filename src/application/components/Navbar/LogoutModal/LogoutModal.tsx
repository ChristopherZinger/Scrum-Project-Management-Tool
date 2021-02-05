import React from "react";
import { useLogoutMutation } from "../../../../types.d";
import { Modal } from "semantic-ui-react";

type Props = {
    close: () => void;
    logout: () => void;
}

export const LogoutModal = (props: Props) => {
    const [logout] = useLogoutMutation();

    return (
        <Modal open>
            <Modal.Header>
                Logout
            </Modal.Header>
            <Modal.Content>
                Are you sure you want to logout?
            </Modal.Content>
            <Modal.Actions>
                <button onClick={async () => {
                    try {
                        await logout();
                    } catch (error) {
                        console.log(error)
                    }
                    props.logout();
                    props.close()
                }}>
                    Yes
                </button>
                <button onClick={() => props.close()} >
                    cancel
                </button>
            </Modal.Actions>
        </Modal>
    )
}