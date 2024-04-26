import SearchInput from "./SearchInput"
import Conversations from "./conversation/Conversations"
import useChatConversationHandler from "../../zustand/useChatConversationHandler"

function Sidebar() {
  const { selectedConversation } = useChatConversationHandler()

  return (
    <div className={`flex flex-col w-full border border-primary_200 p-3 bg-background rounded-xl bg-opacity-20 
    ${selectedConversation ? 'max-lg:hidden' : ''} 
    sm:w-72
    sm:max-w-72
    sm:p-4
    lg:min-w-72
    xl:min-w-80
    `}>
      <h1 className="font-bold mb-1.5 ml-1 text-xl">ChatApp</h1>
      <SearchInput />
      <Conversations />
    </div>
  )
}

export default Sidebar
