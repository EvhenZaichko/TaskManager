import {createTask} from '../store/tasksSlice'
import {closeModal} from "../store/modalSlice";
import {useAppDispatch} from "../store";
import {useState} from "react";
import PrioritySelect from "../UI/PrioritySelect.tsx";
import type {Priority} from "../types/taskTypes.ts";
import {useCurrentProjectId} from "../hooks/useCurrentProjectId.ts";


const CreateTaskForm = () => {
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState<Priority>('Medium')
    const [description, setDescription] = useState('')

    const projectId = useCurrentProjectId()

    const dispatch = useAppDispatch()


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!projectId) return

        dispatch(createTask({title: title, priority: priority, description: description, project: projectId }))
        dispatch((closeModal()))
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5 text-fg bg-black/50 p-5 rounded-xl">
            <div>
                <h1 className="text-lg font-semibold">Create Task</h1>
            </div>

            <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Title</span>
                <input
                    type="text"
                    className="rounded-lg border border-line bg-app px-3 py-2 text-sm placeholder:text-muted/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="JWT for example"
                />
            </label>

            <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Description</span>
                <textarea
                    className="scrollbar-thin min-h-32 max-h-60 resize-none rounded-lg border border-line bg-app px-3 py-2 text-sm placeholder:text-muted/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Task details (optional)"
                />
            </label>

            <PrioritySelect value={priority} onChange={setPriority}/>

            <button
                type="submit"
                className="self-end rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover active:scale-[0.98]"
            >
                Create
            </button>
        </form>
    );
};

export default CreateTaskForm;