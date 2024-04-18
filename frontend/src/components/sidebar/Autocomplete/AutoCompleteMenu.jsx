import React from 'react'
import AutoComplete from './AutoComplete'
import useConversation from '../../../zustand/useConversations'
import { PiWarningCircleLight } from "react-icons/pi";

function AutoCompleteMenu({ loading }) {
  const { autoCompleteConversation } = useConversation()

  return (
    <div className='w-48 absolute bg-accent_color bg-opacity-30 rounded-lg p-2 left-0 top-16 z-50 backdrop-blur-md max-h-[296px] overflow-y-auto'>
      <ul>
        {!loading && autoCompleteConversation &&
          autoCompleteConversation.map(conversation => (
            <AutoComplete key={conversation._id} conversation={conversation} />
          ))}

        {!loading && !autoCompleteConversation &&
          <div className='flex flex-col items-center justify-center'>
            <span className='font-semibold'>No results found</span>
            <PiWarningCircleLight className='text-2xl mt-1' />
          </div>}

          {loading &&
          <div className='flex justify-center'>
          <span className='loading loading-dots my-2.5'></span>
        </div>}
      </ul>
    </div>
  )
}

export default AutoCompleteMenu