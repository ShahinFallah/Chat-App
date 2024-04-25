// import { IoAddCircleOutline } from "react-icons/io5";
import Conversation from "./Conversation"
import useGetConversation from "../../../hooks/useGetConversation";
import useConversations from "../../../zustand/useConversations"
import useListenConversation from "../../../hooks/useListenConversation";
import useListenDelete from "../../../hooks/useListenDelete";
import Notification from '../../notification/Notification'
import useListenMessages from "../../../hooks/useListenMessages"

function Conversations() {
  const { loading: getLoading } = useGetConversation()
  const { conversations, addConLoading } = useConversations()
  const { notification } = useListenMessages()

  useListenConversation()

  useListenDelete()

  return (
    <>

      {
        notification &&
        <Notification data={notification} />
      }

      {addConLoading && (
        <div className="fixed add-conversation-loading backdrop-blur-md inset-0 z-50 flex justify-center items-center ">
          <span className="loading loading-ring size-14"></span>
        </div>
      )}

      {!conversations.length <= 0 ?

        !getLoading ?
          <div className="flex flex-col mt-6 text-primary_300 overflow-y-auto space-y-4">
            {conversations.map(conversation => (
              <Conversation key={conversation._id} conversationData={conversation} />
            ))}
          </div> :
          <div className="flex justify-center mt-5">
            <span className="loading loading-spinner"></span>
          </div>


        : noConversation()}
    </>
  )
}


const noConversation = () => {
  return (

    <div className="flex flex-col h-full items-center justify-start pt-2">
      <span className="font-bold opacity-35 border-b p-2 rounded border-primary_200">Add new users through search</span>
    </div>


    // Coming Soon ...
    // <div className="flex flex-col h-full items-center justify-center">
    //   <button><IoAddCircleOutline className="text-5xl text-primary_200 transition-all hover:text-primary_300" /></button>
    // </div>
  )
}

export default Conversations