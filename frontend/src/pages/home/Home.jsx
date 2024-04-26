import Sidebar from "../../components/sidebar/Sidebar"
import MessagesContainer from '../../components/messages/MessagesContainer'


function Home() {
  return (
    <div className="flex w-full h-full home-bg-color bg-background rounded-lg border border-primary_200
      sm:p-7
      md:h-4/5
      lg:w-8/12
      lg:max-w-[1300px]
      lg:min-w-[1000px]
      ">
      <Sidebar />
      <MessagesContainer />

    </div>

  )
}

export default Home