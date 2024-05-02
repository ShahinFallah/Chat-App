import { VscSend } from "react-icons/vsc";
import useSendMessage from "../../hooks/useSendMessage";
import { useState } from "react";

function MessageInput() {
  const { loading, sendMessage } = useSendMessage()
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()

    await sendMessage(inputValue)
    setInputValue("")
  }

  return (
    <form>
      <div className="flex items-center bg-background p-3 rounded-lg border border-primary_200 bg-opacity-35 small-height:p-2.5 small-height:text-xs small-height:max-h-[37px]">
        <div className="flex flex-grow-[1]">
          <input
            autoFocus
            type="text"
            className="bg-transparent w-full break-words outline-none"
            placeholder="Send a message"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
        </div>
        <button disabled={loading} onClick={handleSubmit} type="submit" className="text-primary text-lg small-height:text-sm">
          {
            !loading ?
              <VscSend /> :
              <div className="flex justify-center items-center">
                <span className="loading loading-spinner loading-sm m-0"></span>
              </div>
          }
        </button>
      </div>
    </form>
  )
}

export default MessageInput
