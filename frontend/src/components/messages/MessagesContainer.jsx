import MessageInput from "./MessageInput"
import MessagesHeader from "./MessagesHeader"
import Messages from "./messages/Messages"
import { TbMessageChatbot } from "react-icons/tb";
import { useAuthContext } from '../../context/AuthContext'
import useChatConversationHandler from '../../zustand/useChatConversationHandler'

function MessagesContainer() {
  const { selectedConversation } = useChatConversationHandler()

  return (
    <div className={`flex flex-col flex-grow-[1] pt-3 rounded-lg p-2 ${selectedConversation ? '' : 'max-sm:hidden'} sm:ml-2 sm:p-0 lg:ml-4 `}>
      {
        selectedConversation ? (
          <>
            <MessagesHeader />
            <Messages />
            <MessageInput />
          </>
        ) : noMessage()
      }
    </div>
  )
}


// No Message 
const noMessage = () => {
  const { userAuth } = useAuthContext()
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col items-center bg-white rounded-lg p-8">
        <h2 className="text-[1.4rem] text-center font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-text_color sm:text-[1.8rem] md:text-3xl small-height:text-[1.6rem]">Welcome, {userAuth.fullName}</h2>
        <p className="text-[0.7rem] text-center text-primary_300 mb-3 sm:text-sm md:text-[0.8rem] small-height:text-[0.7rem]">Select a chat to start messaging</p>
        <TbMessageChatbot className="text-5xl text-primary_300 md:text-7xl small-height:text-6xl" />
      </div>
    </div>
  )
}

export default MessagesContainer