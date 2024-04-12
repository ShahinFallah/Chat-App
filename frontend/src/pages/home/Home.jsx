import Sidebar from "../../components/sidebar/Sidebar"
import MessagesContainer from '../../components/messages/MessagesContainer'


function Home() {
  return (
    <div className="flex w-[1230px] h-[750px] home-bg-color rounded-lg p-7 border border-primary_200">
      <Sidebar />
      <MessagesContainer />
    </div>
  )
}

export default Home