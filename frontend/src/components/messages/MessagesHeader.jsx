import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";

function MessagesHeader() {
  return (
    <div className="flex items-center justify-between w-full border-b border-b-primary_200 pb-2">

      <div className="flex items-center">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <h2 className="text-xl font-semibold ml-6 text-primary_300">John Doe</h2>
      </div>

      <div className="flex items-center text-2xl text-primary_300 space-x-4">
        <IoCallOutline className="cursor-pointer transition duration-300 ease-in-out hover:text-green" />
        <CiVideoOn className="cursor-pointer transition duration-300 ease-in-out hover:text-accent" />

      </div>

    </div>
  )
}

export default MessagesHeader