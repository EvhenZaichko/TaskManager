import  {configureStore} from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import tasksReducer from './tasksSlice'
import modalReducer from './modalSlice'
import toastReducer from './toastSlice'
import projectReducer from './projectSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
            tasks: tasksReducer,
            modal: modalReducer,
            toast: toastReducer,
            projects: projectReducer,
            auth: authReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()