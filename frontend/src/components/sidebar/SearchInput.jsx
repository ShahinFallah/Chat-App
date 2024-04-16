import AutoCompleteMenu from "./Autocomplete/AutoCompleteMenu"
import useGetAutoComplete from "../../hooks/useGetAutoComplete"
import { useState } from "react"

function SearchInput() {
    const { loading, getConversation } = useGetAutoComplete()
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState("")

    let timer;
    const handleChange = async e => {
        clearTimeout(timer)
        timer = setTimeout( async () => {
            setInputValue(e.target.value)
            await getConversation(e.target.value)
        }, 1000);
    }
    return (
        <div className="relative">
            <label className="input input-bordered input-ghost flex items-center gap-2 mt-3 rounded-full">
                <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
            {isFocused && inputValue && 
                <AutoCompleteMenu loading={loading}  />
            }
        </div>
    )
}

export default SearchInput