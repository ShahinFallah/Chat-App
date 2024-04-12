import { FaTrash } from "react-icons/fa6";

function Conversation() {
    return (
        <div className="flex items-center justify-between cursor-pointer group hover:bg-background_300 p-1 rounded-lg transition py-2">
            <div className="avatar online">
                <div className="w-[2.7rem] rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div className="flex flex-col items-start w-28 mr-20 my-55 space-y-[0.5px]">
                <p className="font-semibold text-[1rem]">John Doe</p>
                <p className="w-40 font-semibold truncate text-[0.800rem] opacity-40">Hey Whats your favorite Color ?</p>
            </div>
            <FaTrash className="mr-2 text-sm opacity-0 group-hover:opacity-100 hover:text-error transition-opacity duration-300" />
        </div>
    )
}

export default Conversation