import { FaTrash } from "react-icons/fa6";
import useDeleteConversation from "../../../hooks/useDeleteConversation";
import useChatConversationHandler from '../../../zustand/useChatConversationHandler'
import { useSocketContext } from "../../../context/SocketContext";

function Conversation({ conversation }) {
    const { loading: deleteLoading, deleteConversation } = useDeleteConversation()
    const { setSelectedConversation, selectedConversation } = useChatConversationHandler()
    const { onlineUsers } = useSocketContext()

    const isSelected = selectedConversation?._id === conversation._id
    const isOnline = onlineUsers.includes(conversation._id)
    console.log(onlineUsers)

    const handleDelete = async e => {
        e.stopPropagation()

        await deleteConversation(conversation._id)
    }

    const handleClick = () => {
        if (deleteLoading) return;
        
        setSelectedConversation(conversation)
    }

    return (
        <div 
        onClick={handleClick} 
        className={`flex items-center justify-between cursor-pointer group hover:bg-background_300 ${isSelected ? "bg-background_200" : ""} p-1 rounded-lg transition duration-100 py-2 ${deleteLoading ? "opacity-55" : ""}`}>
            {
                false ?
                    <div className={`avatar ${isOnline ? "online" : ""}`}>
                        <div className="w-[2.7rem] rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    :
                    <div className={`avatar placeholder ${isOnline ? "online" : ""}`}>
                        <div className="bg-gradient-to-br from-primary_200  text-text_color to-primary rounded-full w-[2.7rem] relative">
                            <span className="text-[1.2rem] absolute top-1.5 ">{showNameInProfile(conversation.fullName)}</span>
                        </div>
                    </div>
            }
            <div className="flex flex-col items-start w-28 mr-20 my-55 space-y-[0.5px]">
                <p className="font-semibold text-[1rem] truncate w-52">{conversation.fullName}</p>
                <p className="w-40 font-semibold truncate text-[0.800rem] opacity-40">Hey Whats your favorite Color ?</p>
            </div>
            {
                !deleteLoading ?
                    <FaTrash onClick={handleDelete} className="mr-2 text-sm opacity-0 group-hover:opacity-100 hover:text-error transition-opacity duration-300" /> :
                    <span className="loading loading-ball"></span>
            }
        </div>
    )
}

export const showNameInProfile = (name) => {
    const fullName = name.split(" ")
    const result = fullName.length > 1 ? `${fullName[0].charAt(0)}${fullName[1].charAt(0)}` : fullName[0].charAt(0)
    return result.toUpperCase()
}

export default Conversation