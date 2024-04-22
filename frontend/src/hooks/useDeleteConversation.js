import { useState } from "react"
import toast from "react-hot-toast"
import useConversations from "../zustand/useConversations"
import chatConversationHandler from '../zustand/useChatConversationHandler'

function useDeleteConversation() {
    const [loading, setLoading] = useState(false)
    const { conversations, addConversations } = useConversations()
    const { setSelectedConversation, selectedConversation } = chatConversationHandler()

    const deleteConversation = async id => {
        setLoading(true)
        try {
            const res = await fetch(`/api/conversation/delete/${id}`, {
                method: 'delete'
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)

            addConversations(conversations.filter(conversation => conversation._id !== id))

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return {loading, deleteConversation}
}

export default useDeleteConversation