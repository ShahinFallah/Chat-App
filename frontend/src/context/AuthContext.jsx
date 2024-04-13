import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ userAuth: null, setUserAuth: () => { } })

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(JSON.parse(localStorage.getItem('chat-user') ? localStorage.getItem('chat-user') : null))

    return <AuthContext.Provider value={{ userAuth, setUserAuth }}>{children}</AuthContext.Provider>
}