import { NavLink } from 'react-router'
import { LayoutGrid, List, Settings } from 'lucide-react'

const navItems = [
    { to: 'board', label: 'Board', icon: LayoutGrid },
    { to: 'backlog', label: 'Backlog', icon: List },
    { to: 'tune', label: 'Tune', icon: Settings },
]


const Sidebar = () => {
    return (
        <aside className="sticky top-14 flex h-[calc(100dvh-3.5rem)] w-70 shrink-0 flex-col self-start border-r border-line bg-surface">
            <nav>
                <ul className="flex flex-col gap-1 p-3 pt-6">
                    {navItems.map(({to, label, icon: Icon}) => (
                        <li key={to}>
                            <NavLink to={to}
                                     className={({isActive}) =>
                                         `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                                         isActive ? 'bg-accent-soft text-accent' : 'text-muted hover:bg-surface-hover hover:text-fg'
                                        }`
                                      }
                                    >
                                <Icon size={18}/>
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
