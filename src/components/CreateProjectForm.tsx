import {useState} from "react";
import {useAppDispatch} from "../store";
import {createProject} from "../store/projectSlice.ts";
import {closeModal} from "../store/modalSlice.ts";


const CreateProjectForm = () => {
    const [title, setTitle] = useState<string>('')

    const dispatch = useAppDispatch()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createProject({title}))
        dispatch((closeModal()))
    }

    return (
        <form className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-line bg-surface p-6 text-fg"
              onSubmit={handleSubmit}
        >
            <h2 className="text-lg font-semibold">New project</h2>

            <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">Name</span>
                <input
                    type="text"
                    placeholder="Task Tracker"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="rounded-lg border border-line bg-app px-3 py-2 text-sm placeholder:text-muted/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
            </label>

            <button
                type="submit"
                className="self-end rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
                Create
            </button>
        </form>
    );
};

export default CreateProjectForm;