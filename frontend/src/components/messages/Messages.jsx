import { useEffect, useRef } from "react"
import useGetMassages from "../../hooks/useGetMassages"
import MessageSkeleton from "../skeletons/MessageSkeleton"
import Message from "./Message"
import useListenMessages from "../../hooks/useListenMessages"

function Messages() {
  const { messages, loading } = useGetMassages()
  useListenMessages()
  const lastMessage = useRef()

  useEffect(() => {
    setTimeout(() =>{
      lastMessage.current?.scrollIntoView({behavior: "smooth"})
    } ,300)
  }, [messages])

  return (
    <div className="px-4 flex-1 overflow-auto">

      {!loading && messages.length > 0 && messages.map(message => (
        <div ref={lastMessage} key={message._id}>
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, index) => <MessageSkeleton key={index} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages





// STARTER CODE

// import Message from "./Message"

// function Messages() {
//   return (
//     <div className="px-4 flex-1 overflow-auto">
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//         <Message />
//     </div>
//   )
// }

// export default Messages