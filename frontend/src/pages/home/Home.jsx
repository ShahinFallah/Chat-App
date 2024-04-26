import Sidebar from "../../components/sidebar/Sidebar"
import MessagesContainer from '../../components/messages/MessagesContainer'


function Home() {
  return (
    <div className="flex w-full home-bg-color h-screen bg-background rounded-lg border border-primary_200
    sm:p-7
    sm:w-[1300px] 
    sm:h-[85vh]
    ">
      <Sidebar />
      <MessagesContainer />
    </div>
  )
}

export default Home