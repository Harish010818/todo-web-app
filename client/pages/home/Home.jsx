import React from "react"
import { Navbar } from "./Navbar"
import { Main } from "./Main"

 export const Home = ({userState, setUserState}) => {
  return (
     <div>
          <Navbar
              userState={userState}
              setUserState={setUserState}   
          />
          <Main />
    </div>
  )
}

