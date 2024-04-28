import { create } from "zustand"

const useUnreadMessages = create((set, get) => ({
    unreadMessages: [],
    addUnreadMessage: unreadMessage => set(prevState => {
        const foundedIndex = prevState.unreadMessages.findIndex(unread => unread._id === unreadMessage._id)

        if (foundedIndex === -1) {
            return { unreadMessages: [...prevState.unreadMessages, { _id: unreadMessage._id, quantity: 1 }] }
        } else {
            const updatedUnreadMessages = [...prevState.unreadMessages]
            updatedUnreadMessages[foundedIndex].quantity += 1
            return { unreadMessages: updatedUnreadMessages }
        }
    }),
    getUnreadMessages: id => {
        const foundMessage = get().unreadMessages.find(unread => unread._id === id);

        const quantity = foundMessage ? foundMessage.quantity : 0

        return quantity > 4 ? '+4' : quantity
    },
    deleteUnreadMessages: id => set(prevState => {
        const updatedUnreadMessages = prevState.unreadMessages.filter(unread => unread._id !== id)
        return { unreadMessages: updatedUnreadMessages }
    }),

    clearUnreadMessages: () => set(() => ({ unreadMessages: [] }))
}))

export default useUnreadMessages