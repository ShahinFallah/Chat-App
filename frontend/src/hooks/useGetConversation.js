import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import getConversations from "../zustand/getConversations"

function useGetConversation() {
    const [loading, setLoading] = useState(false)
    const { conversations, addConversations } = getConversations() 
    
    useEffect(() => {
        
        const getConversation = async () => {
            setLoading(true)
            try {
                const res = await fetch('api/users/conversations')
                const data = await res.json()

                if (data.error) throw new Error(data.error)

                addConversations([...conversations,...data])
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        getConversation()
    }, [])

    return {loading}
}

export default useGetConversation