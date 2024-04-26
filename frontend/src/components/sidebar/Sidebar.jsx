import SearchInput from "./SearchInput"
import Conversations from "./conversation/Conversations"
import useChatConversationHandler from "../../zustand/useChatConversationHandler"

function Sidebar() {
  const { selectedConversation } = useChatConversationHandler()

  return (
    <div className={`flex flex-col min-w-full border border-primary_200 p-3 bg-background rounded-xl bg-opacity-20 
    ${selectedConversation ? 'max-sm:hidden' : ''} 
    sm:min-w-80
    sm:p-4
    `}>
      <h1 className="font-bold mb-1.5 ml-1 text-xl">ChatApp</h1>
      <SearchInput />
      <Conversations />
    </div>
  )
}

export default Sidebar
