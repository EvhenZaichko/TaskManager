import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type {Task, Status, UpdateTaskBody, CreateTaskBody} from '../types/taskTypes'
import * as tasksApi from '../api/tasksApi.ts'




export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (body: CreateTaskBody) => {
        return await tasksApi.create(body)
    },
)

export const loadTasks = createAsyncThunk(
    'tasks/loadTasks',
    async (id: string) => {
        return await tasksApi.load(id)
    }
)

export const changeTaskStatus = createAsyncThunk(
    'tasks/changeTaskStatus',
    async ({id, status} : {id: string, status: Status}) => {
        return await tasksApi.changeStatus(id, status)
    }
)

export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    async ({id, changes} : {id: string, changes: UpdateTaskBody}) => {
        return await tasksApi.update(id, changes)
    }
)

export const removeTask = createAsyncThunk(
    'tasks/removeTask',
    async (id: string)=>{
        return await tasksApi.remove(id)
    }
)



type TasksState = {
    items: Task[]
    loading: boolean
    creating: boolean
    error: string | null
}

const initialState: TasksState = {
    items: [

    ],
    loading: false,
    creating: false,
    error: null

}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.creating = true
                state.error = null
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.creating = false
                state.items.push(action.payload)
            })
            .addCase(createTask.rejected, (state, action) => {
                state.creating = false
                state.error = action.error.message ?? 'Failed to create task'
            })
            .addCase(loadTasks.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadTasks.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(loadTasks.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Failed to load tasks'
            })
            .addCase(changeTaskStatus.fulfilled, (state, action) => {
                const task = state.items.find(task => task.id === action.payload.id)
                if (task) task.status = action.payload.status
            })
            .addCase(changeTaskStatus.rejected, (state, action) => {
                state.error = action.error.message ?? 'Failed to change status'
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.items = state.items.map((t) => (t.id === action.payload.id ? action.payload : t))
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = (action.payload as string) ?? action.error.message ?? 'Failed to update task'
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.items = state.items.filter((t) => t.id !== action.payload)
            })
            .addCase(removeTask.rejected, (state, action) => {
                state.error = action.error.message ?? 'Failed to delete task'
            })
    }
})


export default tasksSlice.reducer