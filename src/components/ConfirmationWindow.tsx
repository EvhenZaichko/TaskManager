import {useCurrentProjectId} from "../hooks/useCurrentProjectId.ts";
import {useNavigate} from "react-router";
import {removeProject} from "../store/projectSlice.ts";
import {useAppDispatch} from "../store";

import { TriangleAlert, Trash2 } from 'lucide-react'
import {closeModal} from "../store/modalSlice.ts";
import toast from "../UI/Toast.tsx";
import {showToast} from "../store/toastSlice.ts";


const ConfirmationWindow = () => {
    const dispatch = useAppDispatch()
    const projectId = useCurrentProjectId()
    const navigate = useNavigate()

    const removeHandler = () => {
        if(!projectId) return
        dispatch(removeProject(projectId)).unwrap
        dispatch(closeModal())
        dispatch(showToast({ message: 'Project deleted', type: 'success' }))
        navigate('/projects')
    }

    return (
        <div className="flex w-full flex-col gap-5 rounded-2xl border border-line bg-surface p-6 text-fg shadow-xl shadow-black/40">
            <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-danger/15 text-danger">
                    <TriangleAlert size={22} />
                </div>

                <div className="flex flex-col gap-1.5">
                    <h2 className="text-lg font-semibold">Delete project?</h2>
                    <p className="text-sm leading-relaxed text-muted">
                        The project and <span className="font-medium text-fg">all its tasks</span> will be deleted.
                        This action cannot be undone.
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-line pt-4">
                <button
                    type="button"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-fg"
                    onClick={() => dispatch(closeModal())}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg bg-danger px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-danger/85"
                    onClick={removeHandler}
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>
        </div>

    );
};

export default ConfirmationWindow;