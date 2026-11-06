import {Outlet, useParams} from 'react-router'
import Sidebar from '../components/Sidebar.tsx'
import {useAppDispatch} from "../store";
import {useEffect} from "react";
import {loadTasks} from "../store/tasksSlice.ts";



const BoardLayout = () => {

    const dispatch = useAppDispatch()

    const {id} = useParams()

    useEffect(() => {
        if(!id) return
        dispatch(loadTasks(id))
    }, [dispatch, id])




    return (
        <div className="flex flex-1">
            <Sidebar />
            <main className="min-w-0 flex-1 p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default BoardLayout