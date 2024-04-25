import useConversations from "../zustand/useConversations"

function unreadMessageSorter(id) {
    const { conversations, addConversations } = useConversations()

    const newConversations = [...conversations]
    const foundedIndex = newConversations.findIndex(con => con._id === id)
    
    if (foundedIndex === -1) return

    const firstUnread = newConversations.splice(foundedIndex, 1)[0]
    newConversations.unshift(firstUnread)

    console.log(newConversations)
}

export default unreadMessageSorter