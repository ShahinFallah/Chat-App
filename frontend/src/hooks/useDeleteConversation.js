import { useState } from "react"
import toast from "react-hot-toast"
import getConversations from "../zustand/getConversations"

function useDeleteConversation() {
    const [loading, setLoading] = useState(false)
    const { conversations, addConversations } = getConversations()

    const deleteConversation = async id => {
        setLoading(true)
        try {
            const res = await fetch(`/api/users/conversations/delete/${id}`, {
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