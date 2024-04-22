import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useChatConversationHandler from '../zustand/useChatConversationHandler'

function useListenMessages() {
    const { socket } = useSocketContext()
    const { messages, setMessage,  selectedConversation} = useChatConversationHandler()

    useEffect(() => {
        socket?.on('newMessage', newMessage => {
            if (selectedConversation._id === newMessage.senderId) setMessage([...messages, newMessage])
        })

        return () => socket?.off('newMessage')
    }, [messages])
}

export default useListenMessages