import { useState } from "react"
import Gender from "./Gender"
import useSignUp from "../../hooks/useSignUp"
import { Link } from "react-router-dom"
import { TbMessageChatbot } from "react-icons/tb";


function SignUp() {
    const { loading, sendForm } = useSignUp()

    const [form, setForm] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    })

    const handleInputChange = e => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleGender = gender => {
        setForm(prev => ({ ...prev, gender: gender }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        await sendForm(form)
    }


    return (
        <form onSubmit={handleSubmit} className="w-full h-full border flex flex-col border-primary_200 bg-gradient-to-br from-background_200 to-accent_color p-2 px-5 rounded-lg space-y-1 shadow-lg shadow-primary_200 sm:w-[410px] sm:h-min">
            <h1 className="text-center text-2xl font-semibold mb-3">Sign Up</h1>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Full Name</span>
                </div>
                <input
                    type="text"
                    placeholder="John Doe"
                    className="input input-bordered w-full"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleInputChange}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Username</span>
                </div>
                <input
                    type="text"
                    placeholder="johndoe"
                    className="input input-bordered w-full"
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="input input-bordered w-full"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Confirm Password</span>
                </div>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    className="input input-bordered w-full"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                />
            </label>
            <Gender handleGender={handleGender} gender={form.gender} />
            <Link to='/login' className="text-sm hover:underline" href="#">Already have an account?</Link>
            <button
                disabled={loading}
                type="submit"
                className="btn border w-full">
                {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>
        </form>

    )
}

export default SignUp