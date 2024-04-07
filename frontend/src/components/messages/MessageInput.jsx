import { useState } from 'react'
import useSendMessage from '../../hooks/useSendMessage'

import { BsSend } from 'react-icons/bs'

function MessageInput() {
    const { loading, sendMessage } = useSendMessage()
    const [message, setMessage] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        if (!message) return;
        await sendMessage(message)
        setMessage("")
    }

    return (
        <form onSubmit={handleSubmit} className="px-4 my-3">
            <div className="w-full relative">
                <input
                    className="border text-ms rounded-lg block w-full p-2.5 bg-gray-600 border-gray-600 text-white"
                    type="text"
                    placeholder="Send a message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
                    {loading ? <span className='loading loading-spinner'></span>:
                    <BsSend />}
                </button>
            </div>
        </form>
    )
}

export default MessageInput









// STARTER CODE

// import { BsSend } from 'react-icons/bs'
// function MessageInput() {
//         return (
//             <form className="px-4 my-3">
//                 <div className="w-full relative">
//                     <input
//                         className="border text-ms rounded-lg block w-full p-2.5 bg-gray-600 border-gray-600 text-white"
//                         type="text"
//                         placeholder="Send a message"
//                     />
//                     <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3"><BsSend /></button>
//                 </div>
//             </form>
//         )
//     }

// export default MessageInput