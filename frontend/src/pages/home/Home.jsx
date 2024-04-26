import Sidebar from "../../components/sidebar/Sidebar"
import MessagesContainer from '../../components/messages/MessagesContainer'


function Home() {
  return (
    <div className="h-screen py-20">
      <div className="flex w-full h-full home-bg-color bg-background rounded-lg border border-primary_200
      sm:p-7
      sm:w-[70vw]
      ">
        <Sidebar />
        <MessagesContainer />
      </div>
    </div>
  )
}

export default Home