import { useNavigate} from 'react-router-dom'

const Login = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const navigate = useNavigate()

    return (
        <div className=" flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-85 h-100 gap-10 bg-gray-950 border-gray-600 border-1 rounded-3xl">
                <h1 className="font-bold text-2xl pt-7">Login</h1>
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
                        type="password"
                        name="password"
                        required
                        className="rounded-lg border border-line bg-app px-3 py-2 text-fg outline-none focus:border-accent"
                        placeholder="Password"
                    />
                </label>
                <div className="flex flex-col gap-1">
                    <button type="submit" className="rounded-lg mt-10 font-semibold text-white cursor-pointer ">
                        Sign in
                    </button>
                    <button  className="rounded-lg  px-2 mt-2 font-semibold text-gray-500 cursor-pointer " onClick={() => navigate('/Register')}>
                        Dont have an account yet
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;