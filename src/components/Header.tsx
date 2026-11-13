import { useEffect, useRef, useState } from 'react'
import { CloudHail } from 'lucide-react'
import { openCreateTask } from '../store/modalSlice'
import { useAppDispatch, useAppSelector } from '../store'
import { Link, NavLink } from 'react-router'
import { useCurrentProject } from '../hooks/useCurrentProject.ts'
import { useCurrentProjectId } from '../hooks/useCurrentProjectId.ts'
import { logout } from '../store/authSlice.ts'

const Header = () => {
    const dispatch = useAppDispatch()

    const currentProject = useCurrentProject()
    const isProjectOpen = useCurrentProjectId()
    const user = useAppSelector((state) => state.auth.user)

    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    return (
        <header className="sticky top-0 z-10 flex h-14 w-full items-center border-b border-line bg-surface shadow-lg shadow-black/40">
            <CloudHail size={32} className="ml-5 text-accent" />

            <div className="ml-10 flex w-full items-center gap-2 font-semibold">
                {isProjectOpen && (
                    <button
                        className="rounded-lg bg-accent px-3 py-1.5 text-white hover:bg-accent-hover"
                        onClick={() => dispatch(openCreateTask())}
                    >
                        Create
                    </button>
                )}
                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        `rounded-lg px-3 py-1.5 ${isActive ? 'bg-surface-hover text-fg' : 'text-muted hover:bg-surface-hover hover:text-fg'}`
                    }
                >
                    Projects
                </NavLink>

                <div ref={menuRef} className="relative ml-auto mr-7">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-accent font-semibold uppercase text-white transition-colors hover:bg-accent-hover"
                    >
                        {user?.username[0]}
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 top-11 w-56 overflow-hidden rounded-xl border border-line bg-surface shadow-lg shadow-black/40">
                            <div className="border-b border-line px-4 py-3">
                                <p className="truncate text-sm font-semibold text-fg">{user?.username}</p>
                                <p className="truncate text-xs font-normal text-muted">{user?.email}</p>
                            </div>
                            <Link
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="block px-4 py-2 text-sm text-fg hover:bg-surface-hover"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={() => dispatch(logout())}
                                className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-danger hover:bg-danger/10"
                            >
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {currentProject && (
                <h1 className="pointer-events-none absolute left-1/2 max-w-[40%] -translate-x-1/2 truncate text-lg font-bold">
                    {currentProject.title}
                </h1>
            )}
        </header>
    )
}

export default Header
