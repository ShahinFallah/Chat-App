import { useEffect, useState } from 'react'
import chatConversationHandler from '../zustand/useChatConversationHandler'
import useUnreadMessages from '../zustand/unreadMessages'
import toast from 'react-hot-toast'
import axiosInstance from '../api/axiosInstance'

function useGetMessages() {
    const { selectedConversation, messages, setMessage } = chatConversationHandler()
    const [loading, setLoading] = useState(false)
    const { deleteUnreadMessages } = useUnreadMessages()

    useEffect(() => {
        if (selectedConversation.conversationState) {
            return setMessage([])
        }
        
        let isMounted = true;

        const getMessages = async () => {

            if (!isMounted) return;
            setLoading(true)
            try {

                const res = await axiosInstance(`/messages/${selectedConversation._id}`)

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
        deleteUnreadMessages(selectedConversation._id)

        return () => (isMounted = false);
    }, [selectedConversation])
    return { messages, loading }
}

export default useGetMessages