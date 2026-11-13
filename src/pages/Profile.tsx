import { CalendarDays, CheckCircle2, FolderKanban, ListTodo, Mail, ShieldCheck, Trash2, User as UserIcon } from 'lucide-react'
import {useAppDispatch, useAppSelector} from "../store";
import {useState} from "react";
import { updateUsername } from "../store/authSlice"
import {showToast} from "../store/toastSlice.ts";

const Profile = () => {
    const user = useAppSelector((state) => state.auth.user)
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState(user?.username ?? '')

    const handleSave = async () => {
        try {
            await dispatch(updateUsername({ username })).unwrap()
            dispatch(showToast({ message: 'Username updated', type: 'success' }))
        } catch {
            dispatch(showToast({ message: 'Failed to update username', type: 'error' }))
        }
    }

    if(!user) {
        return <div>Failed to load data</div>
    }


    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 md:px-6">
            <section className="overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="h-28 bg-gradient-to-r from-accent/40 via-accent/15 to-transparent" />

                <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end">
                    <div className="-mt-12 flex size-24 shrink-0 items-center justify-center rounded-2xl border-4 border-surface bg-accent text-4xl font-bold uppercase text-white shadow-lg shadow-black/40">
                        {user.username[0]}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <h1 className="truncate text-2xl font-bold">{user.username}</h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                            <span className="flex items-center gap-1.5">
                                <Mail size={14} /> {user.email}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CalendarDays size={14} /> Member since November 2026
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Статистика */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <FolderKanban size={22} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold leading-none">0</p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-muted">Projects</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <ListTodo size={22} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold leading-none">0</p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-muted">Tasks</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                        <CheckCircle2 size={22} />
                    </div>
                    <div>
                        <p className="text-2xl font-bold leading-none">0</p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-muted">Completed</p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <section className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
                    <div className="flex items-center gap-2">
                        <UserIcon size={18} className="text-accent" />
                        <h2 className="font-semibold">Account</h2>
                    </div>

                    <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                        Username
                        <input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-lg border border-line bg-app px-3 py-2 text-sm normal-case tracking-normal text-fg outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                    </label>

                    <label className="flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wide text-muted">
                        Email
                        <input
                            placeholder="user@mail.com"
                            disabled
                            className="w-full cursor-not-allowed rounded-lg border border-line bg-app px-3 py-2 text-sm normal-case tracking-normal text-fg opacity-60 outline-none"
                        />
                    </label>

                    <div className="mt-auto flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            className="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-fg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </section>

                {/* Безпека */}
                <section className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={18} className="text-accent" />
                        <h2 className="font-semibold">Security</h2>
                    </div>

                    <input
                        type="password"
                        placeholder="Current password"
                        className="w-full rounded-lg border border-line bg-app px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                    <input
                        type="password"
                        placeholder="New password (min 6 characters)"
                        className="w-full rounded-lg border border-line bg-app px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full rounded-lg border border-line bg-app px-3 py-2 text-sm text-fg outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                    <p className="-mt-2 text-xs text-danger">Passwords don't match</p>

                    <div className="mt-auto flex justify-end pt-2">
                        <button
                            type="button"
                            className="cursor-pointer rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent"
                        >
                            Update password
                        </button>
                    </div>
                </section>
            </div>

            {/* Небезпечна зона */}
            <section className="flex flex-col gap-4 rounded-2xl border border-danger/40 bg-danger/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="font-semibold text-danger">Delete account</h2>
                    <p className="mt-1 text-sm text-muted">
                        All your projects and tasks will be permanently removed. This can't be undone.
                    </p>
                </div>
                <button
                    type="button"
                    className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-danger/60 px-4 py-2 text-sm font-semibold text-danger transition-colors hover:bg-danger hover:text-white"
                >
                    <Trash2 size={16} />
                    Delete account
                </button>
            </section>
        </div>
    )
}

export default Profile
