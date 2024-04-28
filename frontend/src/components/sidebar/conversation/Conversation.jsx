import { FaTrash } from "react-icons/fa6";
import useDeleteConversation from "../../../hooks/useDeleteConversation";
import useChatConversationHandler from '../../../zustand/useChatConversationHandler'
import { useSocketContext } from "../../../context/SocketContext";
import useConversations from "../../../zustand/useConversations"
import useUnreadMessages from "../../../zustand/unreadMessages";
import showNameInProfile from "../../../utils/showNameInProfile";

function Conversation({ conversationData }) {
    const { loading: deleteLoading, deleteConversation } = useDeleteConversation()
    const { setSelectedConversation, selectedConversation } = useChatConversationHandler()
    const { onlineUsers } = useSocketContext()
    const { conversations, addConversations } = useConversations()
    const { getUnreadMessages, deleteUnreadMessages } = useUnreadMessages()

    const isSelected = selectedConversation?._id === conversationData._id
    const isOnline = onlineUsers.includes(conversationData._id)


    const unReadMessages = getUnreadMessages(conversationData._id)

    const handleDelete = async e => {
        e.stopPropagation()

        if (selectedConversation?._id === conversationData._id) setSelectedConversation(null)
        if (conversationData.conversationState) {
            return addConversations(conversations.filter(conversation => conversation._id !== conversationData._id))
        }
        deleteUnreadMessages(conversationData._id)
        await deleteConversation(conversationData._id)
    }

    const handleClick = () => {
        if (deleteLoading) return;

        setSelectedConversation(conversationData)
    }

    return (
        <div
            onClick={handleClick}
            className={`flex items-center justify-between cursor-pointer group hover:bg-background_300 ${isSelected ? "bg-background_200" : ""} p-1 rounded-lg transition duration-100 py-2 relative ${deleteLoading ? "opacity-55" : ""}`}>

            <div className="flex items-center">
                {
                    false ?
                        <div className={`avatar ${isOnline ? "online" : ""}`}>
                            <div className="w-[2.7rem] rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        :
                        <div className={`avatar placeholder ${isOnline ? "online" : ""}`}>
                            <div className="bg-gradient-to-br from-primary_200 text-text_color to-primary rounded-full size-[2.4rem] relative small-height:size-[2.15rem]">
                                <span className="text-[1.1rem] absolute top-[0.30rem] small-height:text-[1rem] small-height:top-[0.30rem]">{showNameInProfile(conversationData.fullName)}</span>
                            </div>
                        </div>
                }
                <div className="flex flex-col items-start w-28 ml-1.5 space-y-[0.5px]">
                    <p className="font-semibold text-sm truncate w-48 sm:w-28 sm:mb-1 lg:w-44 lg:text-[0.955rem] small-height:lg:text-[0.760rem] small-height:w-32">{conversationData.fullName}</p>
                    <p className="w-28 font-semibold truncate text-[0.800rem] opacity-40 sm:text-[0.670rem] small-height:text-[0.600rem]">Hey Whats your favorite Color ?</p>
                </div>
            </div>
            {
                !deleteLoading ?
                    <>
                        <FaTrash onClick={handleDelete} className=" opacity-80 transition-opacity duration-300 
                        sm:text-sm
                        sm:mr-1
                        lg:opacity-0 
                        lg:group-hover:opacity-100
                        lg:hover:text-error
                        small-height:text-xs" />


                        {
                            !unReadMessages == 0 ?
                                <div className="absolute flex justify-center items-center right-0 size-6 bg-primary rounded-full group-hover:opacity-0 group-hover:-z-50 transition-opacity duration-300 sm:right-1">
                                    <span className="text-sm font-semibold text-text_color">{unReadMessages}</span>
                                </div> :
                                null
                        }
                    </>
                    :
                    <span className="loading loading-ball"></span>
            }
        </div>
    )
}

export default Conversation