import type {Status, Task} from '../types/taskTypes'
import {Trash, PencilLine, User} from 'lucide-react'
import {changeTaskStatus, removeTask} from "../store/tasksSlice.ts";
import {useAppDispatch} from "../store";
import {useEffect, useRef, useState} from "react";

type BackLogItemProps = {
    task: Task
    activeItem: string | null
    setActiveItem: (id: string | null) => void
}


const statusOptions: { value: Status; label: string }[] = [
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'in_review', label: 'In Review' },
    { value: 'done', label: 'Done' },
]


const BacklogItem = ({task, activeItem , setActiveItem}: BackLogItemProps) => {

    const dispatch = useAppDispatch()

    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (activeItem !== task.id) return

        const onPointerDown = (e: PointerEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) setActiveItem(null)
        }

        document.addEventListener('pointerdown', onPointerDown)
        return () => document.removeEventListener('pointerdown', onPointerDown)
    }, [activeItem])


    return (
        <div className="flex items-center w-full h-10 px-4 py-8 bg-black border-gray-600 border-1 rounded-2xl transition-colors duration-200 hover:bg-gray-700/10">
            <div className="flex flex-col  justify-center">
                <span>{task.title}</span>
                <span className="text-gray-500">{task.priority}</span>
            </div>
            <div className="flex relative ml-auto gap-10">
                {activeItem === task.id && (
                    <div ref={menuRef} className="absolute right-0 top-full z-10 mt-2 flex w-40 flex-col overflow-hidden rounded-lg border border-line bg-surface py-1 shadow-lg shadow-black/40" onClick={(e) => e.stopPropagation()}>
                        {statusOptions.map(option => (
                            <span
                                key={option.value}
                                className="cursor-pointer px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-hover hover:text-fg"
                                onClick={() => dispatch(changeTaskStatus({id: task.id, status: option.value}))}>
                                {option.label}
                            </span>
                        ))}
                    </div>
                )}
                <Trash className="text-red-500 cursor-pointer" onClick={() => {
                    dispatch(removeTask(task.id))
                    setActiveItem(null)
                }}/>
                <PencilLine className="cursor-pointer" onClick={() => setActiveItem(task.id)}/>
                <User className="cursor-pointer" />
            </div>
        </div>
    );
};

export default BacklogItem;