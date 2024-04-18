import { createContext, useContext, useEffect, useState } from "react"
import { useAuthContext } from "./AuthContext"
import { io } from "socket.io-client"

const SocketContext = createContext(null)

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {

    const { userAuth } = useAuthContext()
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if (userAuth) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: userAuth._id
                }
            })
            setSocket(socket)

            socket.on('getOnlineUsers', users => {
                setOnlineUsers(users)
            })

            return () => socket.close()

        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }

    }, [userAuth])
    return <SocketContext.Provider value={{ onlineUsers, userAuth, socket }}>{children}</SocketContext.Provider>
}

export default SocketContext