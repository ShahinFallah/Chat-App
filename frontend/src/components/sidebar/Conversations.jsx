import React, { useEffect, useRef } from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmp } from '../../utils/emojis'

function Conversations() {
    const { loading, conversations } = useGetConversations()

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations.map((conversation, index) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmp()}
                    lastIndex={index == conversations.length - 1}
                />
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    )
}

export default Conversations






// STARTER CODE

// import React from 'react'
// import Conversation from './Conversation'

// function Conversations() {
//     return (
//         <div className='py-2 flex flex-col overflow-auto'>
//             <Conversation />
//         </div>
//     )
// }

// export default Conversations