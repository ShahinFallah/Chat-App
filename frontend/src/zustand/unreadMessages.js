import { create } from "zustand";

const useUnreadMessages = create((set, get) => {
    const storedUnreadMessages = localStorage.getItem('unreadMessages');
    const initialState = {
        unreadMessages: storedUnreadMessages ? JSON.parse(storedUnreadMessages) : []
    };

    return ({
        ...initialState,
        addUnreadMessage: unreadMessage => set(prevState => {
            const foundedIndex = prevState.unreadMessages.findIndex(unread => unread._id === unreadMessage._id);

            if (foundedIndex === -1) {
                const updatedUnreadMessages = [...prevState.unreadMessages, { _id: unreadMessage._id, quantity: 1 }];
                localStorage.setItem('unreadMessages', JSON.stringify(updatedUnreadMessages));
                return { unreadMessages: updatedUnreadMessages };
            } else {
                const updatedUnreadMessages = [...prevState.unreadMessages];
                updatedUnreadMessages[foundedIndex].quantity += 1;
                localStorage.setItem('unreadMessages', JSON.stringify(updatedUnreadMessages));
                return { unreadMessages: updatedUnreadMessages };
            }
        }),
        getUnreadMessages: id => {
            const foundMessage = get().unreadMessages.find(unread => unread._id === id);
            const quantity = foundMessage ? foundMessage.quantity : 0;
            return quantity > 4 ? '+4' : quantity;
        },
        deleteUnreadMessages: id => set(prevState => {
            const updatedUnreadMessages = prevState.unreadMessages.filter(unread => unread._id !== id);
            localStorage.setItem('unreadMessages', JSON.stringify(updatedUnreadMessages));
            return { unreadMessages: updatedUnreadMessages };
        }),
        clearUnreadMessages: () => {
            localStorage.removeItem('unreadMessages');
            return { unreadMessages: [] };
        }
    });
});

export default useUnreadMessages;
