import MessageInput from "./MessageInput"
import MessagesHeader from "./MessagesHeader"
import Messages from "./messages/Messages"
import { TbMessageChatbot } from "react-icons/tb";

function MessagesContainer() {
  return (
    <div className="flex flex-col flex-grow-[1] ml-4 pt-3 rounded-lg">
      {
        true ? (
          <>
            <MessagesHeader />
            <Messages />
            <MessageInput />
          </>
        ) :
          (
            <div className="flex flex-col justify-center items-center h-screen">
              <div className="flex flex-col items-center bg-white rounded-lg p-8">
                <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-text_color">Welcome, John Doe!</h2>
                <p className="text-lg text-white mb-3">Select a chat to start messaging</p>
                <TbMessageChatbot className="text-7xl text-primary_300" />
              </div>
            </div>
          )
      }
    </div>
  )
}

export default MessagesContainer