import React from 'react';
import { useNavigate} from 'react-router-dom'

const Registration = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const navigate = useNavigate()

    return (
        <div className=" flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-85 h-100 gap-10 bg-gray-950 border-gray-600 border-1 rounded-3xl">
                <h1 className="font-bold text-2xl pt-7">Registration</h1>
                <label className="flex flex-col gap-1 text-sm text-muted">
                    <input
                        type="email"
                        name="email"
                        required
                        className="rounded-lg border border-line bg-app px-3 py-2 text-fg outline-none focus:border-accent"
                        placeholder="Email"
                    />
                </label>

                <label className="flex flex-col gap-1 text-sm text-muted">
                    <input
                        type="username"
                        name="username"
                        required
                        className="rounded-lg border border-line bg-app px-3 py-2 text-fg outline-none focus:border-accent"
                        placeholder="Username"
                    />
                </label>
                <label className="flex flex-col gap-1 text-sm text-muted">
                    <input
                        type="password"
                        name="password"
                        required
                        className="rounded-lg border border-line bg-app px-3 py-2 text-fg outline-none focus:border-accent"
                        placeholder="Password"
                    />
                </label>
                <div className="flex flex-col gap-1">
                    <button type="submit" className="rounded-lg  font-semibold text-white cursor-pointer ">
                        Sign up
                    </button>
                    <button  className="rounded-lg  px-2 font-semibold text-gray-500 cursor-pointer " onClick={() => navigate('/')}>
                        Already have an account
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Registration;