import { IoMdSearch } from "react-icons/io";
import useCreateConversation from "../../../hooks/useCreateConversation";

function AutoComplete({ conversation }) {
    const { createConversation } = useCreateConversation()
    const handleClick = async () => {
        conversation.messagesState = true
        await createConversation(conversation)
    }

    return (
        <li onMouseDown={handleClick} className='flex items-center justify-between font-semibold cursor-pointer p-2 transition-all hover:bg-accent_color hover:bg-opacity-25 rounded-md'>
            <span className="truncate">{conversation.username}</span>
            <div>
                <IoMdSearch className="text-xl" />
            </div>
        </li>
    )
}

export default AutoComplete