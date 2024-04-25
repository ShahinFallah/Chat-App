import SearchInput from "./SearchInput"
import Conversations from "./conversation/Conversations"

function Sidebar() {
  return (
    <div className="flex flex-col min-w-80 border border-primary_200 p-4 bg-background rounded-xl bg-opacity-20">
      <h1 className="font-bold mb-1.5 ml-1 text-xl">ChatApp</h1>
      <SearchInput />
      <Conversations />
    </div>
  )
}

export default Sidebar
