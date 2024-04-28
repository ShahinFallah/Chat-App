import { useAuthContext } from "../../../context/AuthContext"

function Message({ message }) {
    const { userAuth } = useAuthContext()

    const fromMe = message.senderId === userAuth._id

    return (
        fromMe ?
            <div className="chat chat-end">
                <div className="chat-bubble bg-bubble_start_color text-text_color break-words whitespace-normal max-w-[80%] small-height:text-sm small-height:min-h-10 ">{message.message}</div>
            </div>

            :

            <div className="chat chat-start">
                <div className="chat-bubble bg-bubble_end_color bg-opacity-70 break-words max-w-[75%] small-height:text-sm small-height:min-h-10">{message.message}</div>
            </div>
    )
}

export default Message