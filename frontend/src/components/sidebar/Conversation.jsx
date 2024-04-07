import { useEffect, useRef } from "react"
import useConversation from "../../zustand/useConversation"

function Conversation({ conversation, emoji, lastIndex }) {
  const { selectedConversation, setSelectedConversation } = useConversation()

  const isSelected = selectedConversation?._id === conversation._id

  const conversationRef = useRef()

  useEffect(() => {
    console.log(123)
    if (!conversationRef.current) return;

    setTimeout(() => {
      conversationRef.current.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [selectedConversation])

  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-sky-400 rounded p-2 py-2 cursor-pointer transition ${isSelected ? "bg-sky-400" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
        ref={isSelected ? conversationRef : null}
      >
        <div className='avatar online'>
          <div className='w-12 rounded-full'>
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className='flex flex-col w-full'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200 flex'>{conversation.fullName}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>

      {!lastIndex ? <div className='divider my-0 py-0 h-1' /> : null}
    </>

  )
}

export default Conversation





// STARTER CODE

// function Conversation() {
//   return (
//     <>
//       <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-2 cursor-pointer'>
//         <div className='avatar online'>
//           <div className='w-12 rounded-full'>
//             <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="user avatar" />
//           </div>
//         </div>

//         <div className='flex flex-col w-full'>
//           <div className='flex gap-3 justify-between'>
//             <p className='font-bold text-gray-200 flex'>John Doe</p>
//             <span className='text-xl'>🕵️‍♀️</span>
//           </div>
//         </div>
//       </div>

//       <div className='divider my-0 py-0 h-1' />
//     </>

//   )
// }

// export default Conversation