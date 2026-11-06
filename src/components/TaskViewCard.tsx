import { useAppSelector, useAppDispatch } from "../store";
import type { Priority, Status, UpdateTaskBody } from '../types/taskTypes'
import PrioritySelect from "../UI/PrioritySelect.tsx";
import { useState } from "react";
import { SquarePen, Pencil, X } from 'lucide-react'
import { removeTask, updateTask} from '../store/tasksSlice'
import { closeModal } from '../store/modalSlice'
import {showToast} from "../store/toastSlice.ts";


const statusLabel: Record<Status, string> = {
    backlog: 'Backlog',
    todo: 'To Do',
    in_progress: 'In Progress',
    in_review: 'In Review',
    done: 'Done',
}

const priorityStyle: Record<Priority, string> = {
    High: 'bg-red-500/15 text-red-400',
    Medium: 'bg-amber-400/15 text-amber-300',
    Low: 'bg-sky-400/15 text-sky-300',
}


const TaskViewCard = () => {
    const taskId = useAppSelector((state) => state.modal.taskId)
    const task = useAppSelector((state) =>
        state.tasks.items.find((item) => item.id === taskId),
    )
    const dispatch = useAppDispatch()

    const [title, setTitle] = useState(task?.title ?? '')
    const [description, setDescription] = useState(task?.description ?? '')
    const [priority, setPriority] = useState<Priority>(task?.priority ?? 'Medium')
    const [status, setStatus] = useState<Status>(task?.status ?? 'backlog')

    const [isEditDescription, setIsEditDescription] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)

    if (!task) return null

    const changes: UpdateTaskBody = {}
    if (title !== task.title) changes.title = title
    if (description !== (task.description ?? '')) changes.description = description
    if (priority !== task.priority) changes.priority = priority
    if (status !== task.status) changes.status = status

    const hasChanges = Object.keys(changes).length > 0

    const handleApply = () => {
        dispatch(updateTask({ id: task.id, changes }))
        setIsEditTitle(false)
        setIsEditDescription(false)
    }

    const handleCancel = () => {
        setTitle(task.title)
        setDescription(task.description ?? '')
        setPriority(task.priority)
        setStatus(task.status)
        setIsEditTitle(false)
        setIsEditDescription(false)
    }

    const handleDelete = async () => {
        try {
            await dispatch(removeTask(task.id)).unwrap()
            dispatch(closeModal())
            dispatch(showToast({ message: 'Task deleted', type: 'success' }))
        } catch (err) {
            console.log('failed', err)
        }
    }

    return (
        <div className="relative flex w-full flex-col gap-5 rounded-xl border border-line bg-surface p-5 text-fg">
            <X
                size={20}
                className="absolute right-3 top-3 cursor-pointer text-muted transition-colors hover:text-fg"
                onClick={() => dispatch(closeModal())}
            />

            <div className="flex flex-col gap-1 pr-8">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">
                    TASK-{task.id.slice(-6)}
                </span>
                <div className="flex items-center gap-2">
                    {isEditTitle ? (
                        <input
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-lg border border-line bg-app px-3 py-1.5 text-lg font-semibold text-fg outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                    ) : (
                        <h2 className="text-lg font-semibold leading-snug">{title}</h2>
                    )}
                    <Pencil
                        size={15}
                        className="shrink-0 cursor-pointer text-muted transition-colors hover:text-fg"
                        onClick={() => setIsEditTitle(!isEditTitle)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <span className="rounded-md bg-surface-active px-2 py-1 text-xs font-medium text-fg">
                    {statusLabel[status]}
                </span>
                <span className={`rounded-md px-2 py-1 text-xs font-medium ${priorityStyle[priority]}`}>
                    {priority}
                </span>
            </div>

            <PrioritySelect value={priority} onChange={setPriority} />

            <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted">Description</span>
                    <SquarePen
                        size={16}
                        className="cursor-pointer text-muted transition-colors hover:text-fg"
                        onClick={() => setIsEditDescription(!isEditDescription)}
                    />
                </div>

                {isEditDescription ? (
                    <textarea
                        autoFocus
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-32 resize-none rounded-lg border border-line bg-app px-3 py-2 text-sm text-fg outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                ) : description ? (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg/90">{description}</p>
                ) : (
                    <p className="text-sm italic text-muted">No description</p>
                )}
            </div>

            <div className="mt-2 flex items-center justify-end gap-2 border-t border-line pt-4">
               <div className=" flex items-center gap-5 mr-auto">
                   <button
                       type="button"
                       className="rounded-lg px-4 py-2 text-sm font-medium bg-red-700 text-white transition-colors cursor-pointer hover:bg-red-500 hover:text-fg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                       onClick={handleDelete}
                   >
                       Delete
                   </button>
                   {hasChanges && (
                       <span className="mr-auto text-xs text-muted">Unsaved changes</span>
                   )}
               </div>
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={!hasChanges}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-muted cursor-pointer transition-colors hover:bg-surface-hover hover:text-fg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleApply}
                    disabled={!hasChanges}
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white cursor-pointer transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-accent"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default TaskViewCard;