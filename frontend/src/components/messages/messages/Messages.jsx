import Message from "./Message"
import useGetMessages from '../../../hooks/useGetMessages'
import { useEffect, useRef } from "react"
import chatConversationHandler from '../../../zustand/useChatConversationHandler'

function Messages() {
  const { messages, loading } = useGetMessages()
  const lastMessageRef = useRef()
  const { selectedConversation } = chatConversationHandler()


  useEffect(() => {
    const scroll = setTimeout(() => {
      if (!lastMessageRef || !lastMessageRef.current) return

      lastMessageRef.current.scrollIntoView({ behavior: "smooth" })
    }, 200)

    return () => clearTimeout(scroll)

  }, [selectedConversation, messages, loading])

  return (
    <div className="flex flex-col flex-grow-[1] overflow-x-auto my-6">


      {// When the conversation was established
        !loading && messages.length > 0 &&
        messages.map(message => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {// When there was no conversation
        !loading && messages.length < 1 &&
        <div className="flex justify-center text-[0.9rem] font-semibold">
          <p className="text-shadow">Send a message to start the conversation</p>
        </div>
      }
      {// Loading
        loading &&
        <>
          <div className="flex flex-col items-start gap-4 w-full mb-12 mt-5">
            <div className="skeleton h-7 w-4/6"></div>
            <div className="skeleton h-7 w-3/6"></div>
            <div className="skeleton h-7 w-4/6"></div>
          </div>
          <div className="flex flex-col items-end gap-4 w-full">
            <div className="skeleton h-7 w-4/6"></div>
            <div className="skeleton h-7 w-3/6"></div>
            <div className="skeleton h-7 w-4/6"></div>
          </div>

        </>
      }

    </div>
  )
}

export default Messages;