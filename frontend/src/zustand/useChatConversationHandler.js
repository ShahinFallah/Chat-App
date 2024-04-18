import { create } from "zustand"

const chatConversationHandler = create(set => ({
    selectedConversation: null,
    setSelectedConversation: conversation => set({ selectedConversation: conversation }),
    messages: [],
    setMessage: message => set(() => ({ messages: message }))
}))

export default chatConversationHandler