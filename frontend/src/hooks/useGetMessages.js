import { useEffect, useState } from 'react'
import chatConversationHandler from '../zustand/useChatConversationHandler'

function useGetMessages() {
    const { selectedConversation, messages, setMessage } = chatConversationHandler()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (selectedConversation.conversationState) {
            return setMessage([])
        }
        
        let isMounted = true;

        const getMessages = async () => {

            if (!isMounted) return;
            setLoading(true)
            try {

                const res = await fetch(`api/messages/${selectedConversation._id}`)

                const data = await res.json()
                if (data.error) throw new Error(data.error);

                setMessage(data)

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        
        getMessages(selectedConversation._id)

        return () => (isMounted = false);
    }, [selectedConversation])
    return { messages, loading }
}

export default useGetMessages