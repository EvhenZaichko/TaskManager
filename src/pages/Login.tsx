import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../store'
import { login } from '../store/authSlice'
import type { LoginBody } from '../types/userTypes.ts'
import { showToast } from '../store/toastSlice.ts'

const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const loading = useAppSelector((state) => state.auth.loading)

    const [form, setForm] = useState<LoginBody>({
        email: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await dispatch(login(form)).unwrap()
            navigate('/projects')
            dispatch(showToast({ message: 'Successful Login!' }))
        } catch {
            dispatch(showToast({ message: 'Wrong email or password', type: 'error' }))
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-line bg-surface p-8"
            >
                <h1 className="mb-2 text-center text-2xl font-bold">Login</h1>

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                    className="rounded-lg border border-line bg-app px-3 py-2 text-fg outline-none focus:border-accent"
                />

                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                    className="rounded-lg border border-line bg-app px-3 py-2 text-fg outline-none focus:border-accent"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 rounded-lg bg-accent py-2 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <Link to="/register" className="text-center text-sm text-muted hover:text-fg">
                    Don't have an account yet?
                </Link>
            </form>
        </div>
    )
}

export default Login
