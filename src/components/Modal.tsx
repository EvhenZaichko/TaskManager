import { useAppDispatch, useAppSelector } from '../store'
import { closeModal } from '../store/modalSlice'
import CreateTaskForm from "./CreateTaskForm.tsx";
import TaskViewCard from "./TaskViewCard.tsx";
import CreateProjectForm from "./CreateProjectForm.tsx";
import ConfirmationWindow from "./ConfirmationWindow.tsx";

const Modal = () => {
    const type = useAppSelector(state => state.modal.type)
    const dispatch = useAppDispatch()



    return (
        <div
            onClick={() => dispatch(closeModal())}
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${!type ? 'scale-100 opacity-0 pointer-events-none' : 'scale-100 opacity-100 bg-black/50'}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`mx-4 w-full ${type === 'taskDetails' ? 'max-w-3xl' : 'max-w-md'}`}
            >
                {type === 'createTask' && <CreateTaskForm/>}
                {type === 'taskDetails' && <TaskViewCard/>}
                {type === 'createProject' && <CreateProjectForm/>}
                {type === 'projectRemove' &&  <ConfirmationWindow/>}
            </div>
            
        </div>
    );
};

export default Modal;