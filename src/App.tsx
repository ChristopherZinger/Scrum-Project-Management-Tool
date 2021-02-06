import React, { createContext, useReducer, useEffect } from 'react'
import { AppRoutes } from "./application/pages/AppRoutes"
import 'semantic-ui-css/semantic.min.css'
import { useMyProfileQuery, UserResponse } from "./types.d"
import "./global-styles/fonts.css";
import 'react-toastify/dist/ReactToastify.css';
import "./global-styles/override-toastr-styles.css";
import { ToastContainer } from "react-toastify";

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
  user: null | UserResponse
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
  return (
    <>
      {error && (
        <h4><span style={{ color: "red" }}>Error: </span> {error.message}</h4>
      )}

      {loading && (
        <div>loading...</div>
      )}

      { data && (
        <UserAuthDispatchContext.Provider value={dispatch}>
          < UserAuthStateContext.Provider value={state}>
            {props.children}
          </UserAuthStateContext.Provider>
        </UserAuthDispatchContext.Provider>
      )}
    </>
  )
}
