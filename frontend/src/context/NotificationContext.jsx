import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export const useNotificationContext = () => {
    return useContext(NotificationContext)
}

export const NotificationContextProvider = ({ children }) => {
    const [notification, setNotification] = useState(null)

    return <NotificationContext.Provider value={{ notification, setNotification }}>{children}</NotificationContext.Provider>
}