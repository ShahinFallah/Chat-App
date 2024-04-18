import toast from "react-hot-toast"
import useConversations from "../zustand/useConversations"
import chatConversationHandler from '../zustand/useChatConversationHandler'

function useCreateConversation() {
    const { setSelectedConversation } = chatConversationHandler()
    
    const { addConversations, conversations, setAddConLoading } = useConversations()

    const createConversation = async conversation => {
        const addConversationState = conversations.find(con => con._id === conversation._id)
        
        if (addConversationState) {
            return setSelectedConversation(addConversationState)
        }
        
        setAddConLoading(true)
        try {
            const res = await fetch(`/api/users/conversation/${conversation._id}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" }
            })

            const data = await res.json()

            if (data.error) throw new Error(data.error)

            addConversations([...conversations, data])
            setSelectedConversation(conversation)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setAddConLoading(false)
        }
    }

    return { createConversation }
}

export default useCreateConversation