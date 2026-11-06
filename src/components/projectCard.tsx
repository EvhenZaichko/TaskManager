import { Clock, ListTodo, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'

type ProjectCardProp = {
    title: string,
    id: string
}

const ProjectCard = ({title, id} : ProjectCardProp) => {
    const navigate = useNavigate()

    return (
        <div className="group flex h-70 w-full cursor-pointer flex-col gap-4 rounded-2xl border border-line bg-surface p-5 transition duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl hover:shadow-black/40">
            <div className="flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-bold text-white">

                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-fg">{title}</h3>
                    <span className="flex items-center gap-1 text-xs text-muted">
                <Clock size={12} />
                Updated 2 days ago
            </span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-bold leading-none text-fg">26</span>
                    <span className="mt-1 text-[10px] uppercase tracking-wide text-muted">Remaining</span>
                </div>
            </div>

            <p className="line-clamp-2 text-sm leading-relaxed text-muted">

            </p>

            <div className="mt-auto grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center gap-1 rounded-lg bg-surface-hover py-2">
                    <span className="text-lg font-semibold text-fg">8</span>
                    <span className="text-[10px] uppercase tracking-wide text-muted">To Do</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-surface-hover py-2">
                    <span className="text-lg font-semibold text-amber-300">4</span>
                    <span className="text-[10px] uppercase tracking-wide text-muted">In Progress</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-surface-hover py-2">
                    <span className="text-lg font-semibold text-sky-300">2</span>
                    <span className="text-[10px] uppercase tracking-wide text-muted">Review</span>
                </div>
                <div className="flex flex-col items-center gap-1 rounded-lg bg-surface-hover py-2">
                    <span className="text-lg font-semibold text-emerald-400">9</span>
                    <span className="text-[10px] uppercase tracking-wide text-muted">Done</span>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
        <span className="flex items-center gap-1.5">
            <ListTodo size={14} />
            12 in backlog
        </span>

                <span className="flex items-center gap-1 font-medium text-accent opacity-0 transition group-hover:opacity-100"
                      onClick={() => navigate(`/projects/${id}/board`)}
                >
            Open board
            <ArrowRight size={14} />
        </span>
            </div>
        </div>
    );
};

export default ProjectCard;