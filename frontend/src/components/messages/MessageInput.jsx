import { VscSend } from "react-icons/vsc";

function MessageInput() {
  return (
    <form>
      <div className="flex items-center bg-background p-2 rounded-lg border border-primary_200 bg-opacity-35">
        <div className="flex flex-grow-[1]">
          <input placeholder="Send a message" className="bg-transparent w-full break-words outline-none" type="text" />
        </div>
        <button type="submit" className="text-primary text-lg"><VscSend /></button>
      </div>
    </form>
  )
}

export default MessageInput
