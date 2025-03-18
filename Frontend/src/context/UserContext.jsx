import React, { createContext, useState } from 'react'

export const UserDataContext = createContext();

const UserContext = ({children}) => {

    const [user, setuser] = useState({})
  return (
    <div>
        <UserDataContext.Provider value={user}>
            {children}
        </UserDataContext.Provider>
     
    </div>
  )
}

export default UserContext
