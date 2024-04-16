import { IoMdSearch } from "react-icons/io";
import useCreateConversation from "../../../hooks/useCreateConversation";

function AutoComplete({ username, id }) {
    const { createConversation, loading } = useCreateConversation()
    console.log("Auto" + loading)
    const handleClick = async () => {
        await createConversation(id)
    }

    return (
        <li onMouseDown={handleClick} className='flex items-center justify-between font-semibold cursor-pointer p-2 transition-all hover:bg-accent_color hover:bg-opacity-25 rounded-md'>
            <span className="truncate">{username}</span>
            <div>
                <IoMdSearch className="text-xl" />
            </div>
        </li>
    )
}

export default AutoComplete