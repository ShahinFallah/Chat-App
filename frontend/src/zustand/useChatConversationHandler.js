import { create } from "zustand"

const useChatConversationHandler = create(set => ({
    
    selectedConversation: null,
    setSelectedConversation: conversation => set({ selectedConversation: conversation }),
    messages: [],
    setMessage: message => set(() => ({ messages: message }))
}))

export default useChatConversationHandler