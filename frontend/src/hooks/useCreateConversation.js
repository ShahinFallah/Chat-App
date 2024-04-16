import toast from "react-hot-toast"
import getConversations from "../zustand/getConversations"

function useCreateConversation() {
    const { addConversations, conversations, setAddConLoading } = getConversations()

    const createConversation = async id => {
        const addConversationState = conversations.some(conversation => conversation._id === id)
        
        if (addConversationState) {
            return toast.error('this user has already in conversation')
        }
        
        setAddConLoading(true)
        try {
            const res = await fetch(`/api/users/conversation/${id}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" }
            })

            const data = await res.json()

            if (data.error) throw new Error(data.error)

            addConversations([...conversations, data])
        } catch (error) {
            toast.error(error.message)
        } finally {
            setAddConLoading(false)
        }
    }

    return { createConversation }
}

export default useCreateConversation