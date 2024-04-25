import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useConversations from "../zustand/useConversations"

function useListenConversation() {
    const { socket } = useSocketContext()
    const { selectedConversation } = useSocketContext()
    const { conversations, addConversations } = useConversations()

    useEffect(() => {
        socket?.on('newConversation', newConversation => {
            addConversations([...conversations, ...newConversation])
        })

        return () => socket?.off('newConversation')
    }, [socket, conversations, addConversations, selectedConversation])
}

export default useListenConversation