import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext";
import useChatConversationHandler from "../zustand/useChatConversationHandler";
import useConversations from "../zustand/useConversations";
import useUnreadMessages from "../zustand/unreadMessages";

function useListenDelete() {
    const { socket } = useSocketContext()
    const { selectedConversation, setSelectedConversation } = useChatConversationHandler()
    const { addConversations } = useConversations()
    const { deleteUnreadMessages } = useUnreadMessages()

    useEffect(() => {
        socket?.on('deleted', ({ conversations: con, deletedId }) => {
            if (selectedConversation?._id === deletedId) setSelectedConversation(null);
            addConversations(con)
            deleteUnreadMessages(deletedId)
        })

        return () => socket?.off('deleted')
    }, [socket, selectedConversation, setSelectedConversation])
}

export default useListenDelete