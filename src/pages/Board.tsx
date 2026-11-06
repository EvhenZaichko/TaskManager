import { useState } from 'react'
import TaskCard from '../components/TaskCard'
import type { Status } from '../types/taskTypes'
import { useAppDispatch, useAppSelector } from '../store'
import { updateTask } from '../store/tasksSlice'

const columns: { status: Status; title: string }[] = [
    { status: 'todo', title: 'To Do' },
    { status: 'in_progress', title: 'In Progress' },
    { status: 'in_review', title: 'In Review' },
    { status: 'done', title: 'Done' },
]

const Board = () => {
    const tasks = useAppSelector((state) => state.tasks.items)
    const dispatch = useAppDispatch()
    const [overColumn, setOverColumn] = useState<Status | null>(null)

    const handleDrop = (e: React.DragEvent, status: Status) => {
        e.preventDefault()
        setOverColumn(null)

        const id = e.dataTransfer.getData('taskId')
        const task = tasks.find((t) => t.id === id)
        if (!task || task.status === status) return      // бросили в ту же колонку

        dispatch(updateTask({ id, changes: { status } }))
    }

    return (
        <div className="flex h-full gap-4">
            {columns.map(({ status, title }) => {
                const columnTasks = tasks.filter((t) => t.status === status)

                return (
                    <section
                        key={status}
                        onDragOver={(e) => {
                            e.preventDefault()
                            setOverColumn(status)
                        }}
                        onDragLeave={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget as Node)) setOverColumn(null)
                        }}
                        onDrop={(e) => handleDrop(e, status)}
                        className={`flex min-w-0 flex-1 flex-col rounded-xl border p-3 transition-colors ${
                            overColumn === status ? 'border-accent bg-accent-soft' : 'border-line bg-surface'
                        }`}
                    >
                        <h2 className="mb-3 text-xs font-semibold uppercase text-muted">
                            {title} <span className="ml-1 text-muted/60">{columnTasks.length}</span>
                        </h2>
                        <div className="flex flex-1 flex-col gap-2">
                            {columnTasks.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}

export default Board