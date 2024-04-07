import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime'
import useConversation from '../../zustand/useConversation'

function Message({message}) {
  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation()

  const fromMe = message.senderId === authUser._id
  const chatClassName = fromMe ? "chat-end" : "chat-start"
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const bubbleBgColor = fromMe ? "bg-blue-500" : ""
  const formattedTime = extractTime(message.createdAt)
  
  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src={profilePic} />
            </div>
        </div>

        <div className={`chat-bubble text-white pb-2 ${bubbleBgColor}`}>{message.message}</div>
        <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>{formattedTime}</div>
    </div>
  )
}

export default Message






// STARTER CODE

// function Message() {
//     return (
//       <div className={`chat chat-end`}>
//           <div className="chat-image avatar">
//               <div className="w-10 rounded-full">
//                   <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
//               </div>
//           </div>
  
//           <div className={`chat-bubble text-white bg-blue-500`}>Hey!</div>
//           <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>12:42</div>
//       </div>
//     )
//   }
  
//   export default Message