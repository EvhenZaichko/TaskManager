import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

type ModalType = 'createTask'| 'taskDetails' |'createProject'| 'projectRemove'

type ModalState = {
    type: ModalType | null
    taskId: string | null
}

const initialState: ModalState = {
    type: null,
    taskId: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openCreateTask: (state) => {
            state.type = 'createTask'
        },
        openTaskDetails: (state, action: PayloadAction<string>) => {
            state.type = 'taskDetails'
            state.taskId = action.payload
        },

        openCreateProject: (state) => {
            state.type = 'createProject'
        },
        openRemoveProject: (state) => {
            state.type = 'projectRemove'
        },
        closeModal: (state) => {
            state.type = null
            state.taskId = null
        }
    }
})

export const { openCreateTask, openTaskDetails, closeModal, openCreateProject, openRemoveProject } = modalSlice.actions
export default modalSlice.reducer