import { create } from 'zustand'

const useConversations = create(set => ({
    autoCompleteConversation: null,
    addAutoCompleteConversation: conversation => set({ autoCompleteConversation: conversation[0] ? conversation : null }),
    conversations: [],
    addConversations: conversation => set({ conversations: conversation }),
    addConLoading: false,
    setAddConLoading: (state) => set({ addConLoading: state }),
    setLastMessage: (newMessage, type) => set(prevState => {
        const updatedConversation = prevState.conversations.map(conversation => conversation._id === newMessage[type] ? { ...conversation, message: newMessage.message } : conversation)
        return { conversations: updatedConversation }
    })
}))

export default useConversations