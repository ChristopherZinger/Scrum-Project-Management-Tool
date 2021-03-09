import React, { useContext } from "react";
import { useLogoutMutation } from "../../../types.d";
import { Modal } from "../../atoms/Modal/Modal";
import { UserAuthDispatchContext } from "../../../App";
import { useHistory } from "react-router-dom";

type Props = {
    close: () => void;
}

export const LogoutModal = (props: Props) => {
    const [logout] = useLogoutMutation();
    const dispatch = useContext(UserAuthDispatchContext);
    const history = useHistory();

    return (
        <Modal open >
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
                    history.push("/")
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