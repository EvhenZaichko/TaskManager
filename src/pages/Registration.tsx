import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../store'
import { registration } from '../store/authSlice'
import type { RegistrationBody } from '../types/userTypes.ts'
import {showToast} from "../store/toastSlice.ts";

const Registration = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { loading, error } = useAppSelector((state) => state.auth)

    const [form, setForm] = useState<RegistrationBody>({
        email: '',
        password: '',
        username: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await dispatch(registration(form)).unwrap()
            navigate('/projects')
        } catch {
            dispatch(showToast({ message: '', type: 'error' }))
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-line bg-surface p-8"
            >
                <h1 className="mb-2 text-center text-2xl font-bold">Registration</h1>

                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    placeholder="Username"
                    className="rounded-lg border border-line bg-app px-3 py-2 text-fg outline-none focus:border-accent"
                />

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
                    minLength={6}
                    placeholder="Password"
                    className="rounded-lg border border-line bg-app px-3 py-2 text-fg outline-none focus:border-accent"
                />

                {error && <p className="text-sm text-danger">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 rounded-lg bg-accent py-2 font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
                >
                    {loading ? 'Creating account...' : 'Sign up'}
                </button>

                <Link to="/login" className="text-center text-sm text-muted hover:text-fg">
                    Already have an account?
                </Link>
            </form>
        </div>
    )
}

export default Registration