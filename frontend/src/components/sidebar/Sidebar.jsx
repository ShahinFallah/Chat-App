import SearchInput from "./SearchInput"
import Conversations from "./conversation/Conversations"
import useChatConversationHandler from "../../zustand/useChatConversationHandler"
import useLogout from "../../hooks/useLogout";
import { CiLogout } from "react-icons/ci";

function Sidebar() {
  const { selectedConversation } = useChatConversationHandler()
  const { loading: logoutLoading, logout } = useLogout()


  const handleLogout = () => {
    logout()
  }

  return (
    <div className={`flex flex-col w-full border border-primary_200 relative p-3 bg-background rounded-xl bg-opacity-20 pb-14
    ${selectedConversation ? 'max-lg:hidden' : ''} 
    sm:w-72
    sm:max-w-72
    sm:p-4
    sm:pb-14
    lg:min-w-72
    small-height:!min-w-36
    xl:min-w-80
    `}>
      <h1 className="font-bold mb-1.5 ml-1 text-xl">ChatApp</h1>
      <SearchInput />
      <Conversations />

      <div className="absolute bottom-5">
        <button disabled={logoutLoading}>
          {
            !logoutLoading ?
            <CiLogout onClick={handleLogout} className="text-xl cursor-pointer transition hover:text-primary_300" />
            :
            <span className="loading loading-spinner"></span>
          }
        </button>
      </div>
    </div>
  )
}

export default Sidebar
