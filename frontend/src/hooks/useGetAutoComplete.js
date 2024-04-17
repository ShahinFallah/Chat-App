import { useState } from "react"
import toast from "react-hot-toast";
import getAutoComplete from '../zustand/getConversations'

function useGetConversation() {
    const { addAutoCompleteConversation } = getAutoComplete()

    const [loading, setLoading] = useState(false)

    const getConversation = async (value) => {
        if (/^\s*$/.test(value)) return;
        if (!value) return addAutoCompleteConversation(null)

        setLoading(true)
        try {
            const res = await fetch(`api/users/search/${value}`)
            const data = await res.json()

            if (data.error) throw new Error(data.error)

            addAutoCompleteConversation(data)
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
            console.log('call')
        }
    }

    return { loading, getConversation }
}

export default useGetConversation