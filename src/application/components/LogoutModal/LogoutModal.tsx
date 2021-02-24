import React, { useContext } from "react";
import { useLogoutMutation } from "../../../types.d";
import { Modal } from "../../atoms/Modal/Modal";
import { UserAuthDispatchContext } from "../../../App";

type Props = {
    close: () => void;
}

export const LogoutModal = (props: Props) => {
    const [logout] = useLogoutMutation();
    const dispatch = useContext(UserAuthDispatchContext);

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
                    dispatch({ type: "logout" })
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