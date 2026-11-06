import {useAppDispatch} from "../store";
import {openRemoveProject} from "../store/modalSlice.ts";

const Tune = () => {
    const dispatch = useAppDispatch()


    return (
        <div className="flex flex-col w-100"
             onClick={() => dispatch(openRemoveProject())}>
            Delete Project
        </div>
    );
};

export default Tune;