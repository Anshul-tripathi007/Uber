import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();

const UserContext = ({children}) => {

    const [user, setuser] = useState({})
    const URL ="http://localhost:3000"
  return (
    <div>
        <UserDataContext.Provider value={{user,setuser,URL}}>
            {children}
        </UserDataContext.Provider>
     
    </div>
  )
}

export default UserContext
