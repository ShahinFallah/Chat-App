import { useAuthContext } from "../../../context/AuthContext"
import formatMessageTime from "../../../utils/formatMessageTime"

function Message({ message }) {
    const { userAuth } = useAuthContext()
    const fromMe = message.senderId === userAuth._id

    return (
        fromMe ?
            <div className="chat chat-end">
                <div className="chat-bubble bg-bubble_start_color text-text_color break-words whitespace-normal max-w-[80%] small-height:text-sm small-height:min-h-10 ">
                    {message.message}

                    <div className="-mt-0.5 text-right">
                        <span className="text-[0.71rem]  font-semibold leading-none text-primary_300 small-height:text-[0.58rem]">{formatMessageTime(message.createdAt)}</span>
                    </div> 
                </div>
            </div>

            :

            <div className="chat chat-start">
                <div className="chat-bubble bg-bubble_end_color bg-opacity-70 break-words max-w-[75%] small-height:text-sm small-height:min-h-10">
                    {message.message}

                    <div className="-mt-0.5 text-left">
                        <span className="text-[0.71rem] opacity-60 font-semibold leading-none text-primary_300 small-height:text-[0.58rem]">{formatMessageTime(message.createdAt)}</span>
                    </div>
                </div>
            </div>
    )
}

export default Message