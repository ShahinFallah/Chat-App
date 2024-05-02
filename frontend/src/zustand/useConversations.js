import { create } from 'zustand'

const useConversations = create(set => ({
    autoCompleteConversation: null,
    addAutoCompleteConversation: conversation => set({ autoCompleteConversation: conversation[0] ? conversation : null }),
    conversations: [],
    addConversations: conversation => set({ conversations: conversation }),
    addConLoading: false,
    setAddConLoading: (state) => set({ addConLoading: state }),
    setLastMessage: (newMessage, typeId) => set(prevState => {
        const updatedConversation = prevState.conversations.map(
            conversation => conversation._id === newMessage[typeId] ? {
                ...conversation,
                lastMessage: {
                    ...conversation.lastMessage,
                    senderId: newMessage.senderId,
                    receiverId: newMessage.receiverId,
                    message: newMessage.message,
                }
            } : conversation
        )
        return { conversations: updatedConversation }
    })
}))

export default useConversations