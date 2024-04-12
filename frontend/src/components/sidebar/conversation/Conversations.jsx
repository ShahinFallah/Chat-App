import Conversation from "./Conversation"

function Conversations() {
  return (
    <div className="flex flex-col mt-6 text-primary_300 overflow-y-auto space-y-4">
        <Conversation />
        <Conversation />
    </div>
  )
}

export default Conversations