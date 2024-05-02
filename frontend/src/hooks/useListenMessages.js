import { useEffect } from "react"
import { useSocketContext } from "../context/SocketContext"
import useChatConversationHandler from '../zustand/useChatConversationHandler'
import useConversations from "../zustand/useConversations"
import { useNotificationContext } from "../context/NotificationContext"
import notificationSound from '../assets/sounds/notif.mp3'
import useUnreadMessages from "../zustand/unreadMessages"

function useListenMessages() {
    const { socket } = useSocketContext();
    const { messages, setMessage, selectedConversation } = useChatConversationHandler();
    const { conversations, addConversations, setLastMessage } = useConversations();
    const { notification, setNotification } = useNotificationContext()
    const { addUnreadMessage } = useUnreadMessages()
    const notifSound = new Audio(notificationSound)

    useEffect(() => {

        socket?.on('newMessage', newMessage => {
            if (selectedConversation?._id === newMessage.senderId) {
                setMessage([...messages, newMessage]);

            } else {
                const foundNotification = conversations.find(conversation => conversation._id === newMessage.senderId);

                handleNotification({ foundNotification, newMessage })

                addUnreadMessage(foundNotification)
                unreadMessageSorter(foundNotification._id)
            }

            setLastMessage(newMessage, 'senderId')
        });

        return () => socket?.off('newMessage');
    }, [messages, selectedConversation, conversations]);

    const handleNotification = ({ foundNotification, newMessage }) => {
        notifSound.volume = 0.9
        notifSound.play()
        setNotification({ notification: foundNotification, message: newMessage.message });
    }

    const unreadMessageSorter = (id) => {
        const newConversations = [...conversations]
        const foundedIndex = newConversations.findIndex(con => con._id === id)

        if (foundedIndex === -1) return;

        const firstUnread = newConversations.splice(foundedIndex, 1)[0]
        newConversations.unshift(firstUnread)

        addConversations(newConversations)
    }

    return { notification, setNotification };
}




export default useListenMessages