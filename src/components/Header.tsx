import {CloudHail} from 'lucide-react'
import { openCreateTask } from '../store/modalSlice'
import {useAppDispatch} from "../store";
import { NavLink } from 'react-router'
import {useCurrentProject} from "../hooks/useCurrentProject.ts";
import {useCurrentProjectId} from "../hooks/useCurrentProjectId.ts";


const Header = () => {
    const dispatch = useAppDispatch()

    const currentProject = useCurrentProject()
    const isProjectOpen = useCurrentProjectId()


    return (
        <header className="relative sticky top-0 z-10 flex h-14 w-full items-center border-b border-line bg-surface shadow-lg shadow-black/40">
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
                <button className="ml-auto mr-7 rounded-lg px-3 py-1.5 text-danger hover:bg-danger/10">Log Out</button>
            </div>

            {currentProject && (
                <h1 className="pointer-events-none absolute left-1/2 max-w-[40%] -translate-x-1/2 truncate text-lg font-bold">
                    {currentProject.title}
                </h1>
            )}
        </header>
    );
};

export default Header;
