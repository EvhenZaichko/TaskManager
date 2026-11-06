import { Outlet } from 'react-router'
import Header from '../components/Header.tsx'
import Modal from '../components/Modal.tsx'
import Toast from '../UI/Toast.tsx'
import {useEffect} from "react";
import {loadProjects} from "../store/projectSlice.ts";
import {useAppDispatch} from "../store";

const RootLayout = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadProjects())
    }, [dispatch])

    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <Modal />
            <Toast />
            <Outlet />
        </div>
    )
}

export default RootLayout