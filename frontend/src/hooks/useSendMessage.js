import { useState } from 'react';
import chatConversationHandler from '../zustand/useChatConversationHandler'
import toast from 'react-hot-toast';

function useSendMessage() {
    const { selectedConversation, messages, setMessage } = chatConversationHandler()

    const [loading, setLoading] = useState(false)

    const sendMessage = async message => {
        if (!message) return

        
        setLoading(true)
        try {
            const res = await fetch(`api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            })
            
            const data = await res.json()
            if (data.error) throw new Error(data.error);
            
            if (selectedConversation.conversationState) selectedConversation.conversationState = false
            setMessage([...messages, data])

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { loading, sendMessage }
}

export default useSendMessage