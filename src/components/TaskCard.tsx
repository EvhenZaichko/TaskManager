import type { Task } from '../types/taskTypes'
import { Info } from 'lucide-react'
import { useAppDispatch } from '../store'
import { openTaskDetails } from '../store/modalSlice'

type TaskCardProps = {
    task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
    const dispatch = useAppDispatch()

    return (
        <article
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('taskId', task.id)
                e.dataTransfer.effectAllowed = 'move'
            }}
            className="flex cursor-grab rounded-lg border border-line bg-surface-hover p-3 transition-colors hover:border-accent/50 hover:bg-surface-active active:cursor-grabbing"
        >
            <div>
                <p className="text-sm text-fg">{task.title}</p>
                <span className="mt-2 block text-xs text-muted">TASK-{task.id.slice(-6)}</span>
            </div>
            <div className="ml-auto flex">
                <Info
                    className="cursor-pointer text-muted hover:text-fg"
                    onClick={() => dispatch(openTaskDetails(task.id))}
                />
            </div>
        </article>
    )
}

export default TaskCard