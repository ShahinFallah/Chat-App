import { BsSend } from 'react-icons/bs'
function MessageInput() {
        return (
            <form className="px-4 my-3">
                <div className="w-full relative">
                    <input
                        className="border text-ms rounded-lg block w-full p-2.5 bg-gray-600 border-gray-600 text-white"
                        type="text"
                        placeholder="Send a message"
                    />
                    <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3"><BsSend /></button>
                </div>
            </form>
        )
    }

export default MessageInput









// STARTER CODE

import { BsSend } from 'react-icons/bs'
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