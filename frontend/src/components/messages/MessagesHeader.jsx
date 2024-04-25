import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import chatConversationHandler from '../../zustand/useChatConversationHandler'
import showNameInProfile from '../sidebar/../../utils/showNameInProfile'
import { useSocketContext } from "../../context/SocketContext";


function MessagesHeader() {
  const { selectedConversation } = chatConversationHandler()
  const { onlineUsers } = useSocketContext()


  const isOnline = onlineUsers.includes(selectedConversation._id)

  return (
    <div className="flex items-center justify-between w-full border-b border-b-primary_200 pb-2">

      <div className="flex items-center">

            <div className={`avatar placeholder ${isOnline ? "online" : ""}`}>
              <div className="bg-gradient-to-br from-primary_200  text-text_color to-primary rounded-full w-[2.7rem] relative">
                <span className="text-[1.2rem] absolute top-1.5 ">{showNameInProfile(selectedConversation.fullName)}</span>
              </div>
            </div>

        <h2 className="text-xl font-semibold ml-6 text-primary_300 truncate w-56">{selectedConversation.fullName}</h2>
      </div>

      <div className="flex items-center text-2xl text-primary_300 space-x-4">
        <IoCallOutline className="cursor-pointer transition duration-300 ease-in-out hover:text-green" />
        <CiVideoOn className="cursor-pointer transition duration-300 ease-in-out hover:text-accent" />
      </div>

    </div>
  )
}

export default MessagesHeader




// ProfilePic ===>

{/* <div className={`avatar online ${isOnline ? "online" : ""}`}>
<div className="w-10 rounded-full">
  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
</div>
</div> : */}
