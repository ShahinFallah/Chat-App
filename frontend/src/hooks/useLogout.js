import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"
import useConversations from "../zustand/useConversations"
import useChatConversationHandler from "../zustand/useChatConversationHandler"
import useUnreadMessages from "../zustand/unreadMessages"

function useLogout() {
    const [loading, setLoading] = useState(false)
    const { setUserAuth } = useAuthContext()
    const { addConversations } = useConversations()
    const { setMessage, setSelectedConversation } = useChatConversationHandler()
    const { clearUnreadMessages } = useUnreadMessages()

    const logout = async () => {

        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error);

            setUserAuth(null)
            localStorage.removeItem('chat-user')
            
            addConversations([])
            setMessage([])
            clearUnreadMessages()
            setSelectedConversation(null)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, logout}
}

export default useLogout