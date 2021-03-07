import React, { createContext, useReducer, useEffect } from 'react'
import { AppRoutes } from "./application/pages/AppRoutes"
import 'semantic-ui-css/semantic.min.css'
import { useMyProfileQuery, UserProfileResponse } from "./types.d"
import "./global-styles/fonts.css";
import 'react-toastify/dist/ReactToastify.css';
import "./global-styles/override-toastr-styles.css";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from './application/atoms/Spinner/Spinner';
import { Colors } from './global-styles/global-styles';
import { ApolloError } from '@apollo/client';

function App () {
  return (
    <div className="App">
      <UserAuthQueryWrapper>
        <AppRoutes />
      </UserAuthQueryWrapper>
      <ToastContainer />
    </div>
  );
}

export default App;

type UserContextType = {
  user: null | UserProfileResponse
}

type UserContextActionType =
  { type: "logout" } |
  { type: "login", user: any }

const userReducer = (state: UserContextType, action: UserContextActionType): UserContextType => {
  switch (action.type) {
    case "logout":
      return { user: null }
    case "login":
      return { user: action.user }
    default:
      return state
  }
}

const initialUserValue: UserContextType = { user: null };
export const UserAuthStateContext = createContext(initialUserValue)
export const UserAuthDispatchContext = createContext<React.Dispatch<any>>(() => null)

const UserAuthQueryWrapper = (props: { children: React.ReactNode }) => {
  const { data, loading, error } = useMyProfileQuery();
  const [state, dispatch] = useReducer(userReducer, initialUserValue)

  useEffect(() => {
    if (data?.user) {
      dispatch({ type: "login", user: data.user })
    }
  }, [data])

  const handleProfileErrors = (error: ApolloError) => {
    const messages = [];
    for (let err of error.graphQLErrors) {
      switch (err.extensions?.code) {
        case "USER_MISSING_FOR_EMAIL":
          messages.push("Session Error. User missing for email. Log in again please.")
          break;

        case "COULD_NOT_LOAD_USER_DATA":
          messages.push("Session Error. User's data is missing. Log in again please.")
          break;

        default:
          break;
      }
    }
    if (messages.length === 0) {
      messages.push("Upss! Something went wrong. Try again later.")
    }
    for (let msg of messages) {
      toast.error(msg)
    }

  }

  return (
    <>
      {loading && (
        <div style={{ width: "100vw", height: "100vh", display: "block", position: "relative" }}>
          <Spinner color={Colors.Text03} />

        </div>
      )}

      {error && handleProfileErrors(error)}

      <UserAuthDispatchContext.Provider value={dispatch}>
        <UserAuthStateContext.Provider value={state}>
          {props.children}
        </UserAuthStateContext.Provider>
      </UserAuthDispatchContext.Provider>
    </>
  )
}


