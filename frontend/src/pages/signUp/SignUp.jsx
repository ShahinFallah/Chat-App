import Gender from "./Gender"

function SignUp() {
    return (
        <form className="w-[410px] border border-primary_200 bg-gradient-to-br from-background_200 to-accent_color p-2 px-5 rounded-lg space-y-1 shadow-lg shadow-primary_200">
            <h1 className="text-center text-2xl font-semibold mb-3">Sign Up</h1>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Full Name</span>
                </div>
                <input type="text" placeholder="John Doe" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Username</span>
                </div>
                <input type="text" placeholder="johndoe" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input type="password" placeholder="Enter Password" className="input input-bordered w-full" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Confirm Password</span>
                </div>
                <input type="password" placeholder="Confirm Password" className="input input-bordered w-full" />
            </label>
            <Gender />
            <a className="text-sm hover:underline" href="#">Already have an account?</a>
            <button type="submit" className="btn border w-full">Sign Up</button>
        </form>

    )
}

export default SignUp