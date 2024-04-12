import Message from "./Message"

function Messages() {
  return (
    <div className="flex flex-col flex-grow-[1] overflow-x-auto my-6">

      <div className="chat chat-start">
        <div className="chat-bubble bg-bubble_end_color bg-opacity-70">It's over Anakin, I have the high ground.</div>
      </div>

      <Message />

    </div>
  )
}

export default Messages