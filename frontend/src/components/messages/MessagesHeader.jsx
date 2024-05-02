import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import chatConversationHandler from '../../zustand/useChatConversationHandler'
import showNameInProfile from '../sidebar/../../utils/showNameInProfile'
import { useSocketContext } from "../../context/SocketContext";
import { RiArrowLeftSLine } from "react-icons/ri";


function MessagesHeader() {
  const { setSelectedConversation, selectedConversation } = chatConversationHandler()
  const { onlineUsers } = useSocketContext()

  const isOnline = onlineUsers.includes(selectedConversation._id)


  const handleCloseChat = () => {
    setSelectedConversation(null)
  }

  return (
    <div className={`flex items-center justify-between w-full border-b border-b-primary_200 pb-2 px-2`}>
      <div className="flex items-center">
        <RiArrowLeftSLine onClick={handleCloseChat} className="text-4xl text-primary_300 cursor-pointer -ml-2.5 mr-2 lg:hidden" />
        <div className="flex items-center">
          <div className={`avatar placeholder ${isOnline ? "online" : ""}`}>
            <div className="bg-gradient-to-br from-primary_200 text-text_color to-primary rounded-full size-[2.4rem] relative small-height:size-[2.1rem]">
              <span className="text-[1.1rem] absolute top-[0.35rem] small-height:text-[0.95rem]">{showNameInProfile(selectedConversation.fullName)}</span>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold ml-2 text-primary_300 truncate w-32 sm:w-64 small-height:text-sm">{selectedConversation.fullName}</h2>
      </div>

      <div className="flex items-center text-2xl text-primary_300 space-x-4">
        <IoCallOutline className="cursor-pointer transition duration-300 ease-in-out hover:text-green small-height:text-lg" />
        <CiVideoOn className="cursor-pointer transition duration-300 ease-in-out hover:text-accent small-height:text-lg" />
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
