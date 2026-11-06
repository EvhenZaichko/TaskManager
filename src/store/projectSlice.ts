import type {CreateProjectBody, Project} from '../types/projectTypes.ts'
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import * as projectApi from '../api/projectApi.ts'




export const createProject = createAsyncThunk(
    'projects/createProject',
    async(body: CreateProjectBody) => {
        return await projectApi.create(body)
    }
)

export const loadProjects = createAsyncThunk(
    'projects/loadProjects',
    async() => {
        return await projectApi.load()
    }
)

export const removeProject = createAsyncThunk(
    'projects/removeProject',
    async(id: string) => {
        return await projectApi.remove(id)
    }
)


type ProjectState = {
    items: Project[]
    loading: boolean
    creating: boolean
    error: string | null

}

const initialState: ProjectState = {
    items: [],
    loading: false,
    creating: false,
    error: null
}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(createProject.pending, (state) => {
                state.creating = true
                state.error = null
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.creating = false
                state.items.push(action.payload)
            })
            .addCase(createProject.rejected, (state, action) => {
                state.creating = false
                state.error = action.error.message ?? 'Failed to create project'
            })
            .addCase(loadProjects.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loadProjects.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
            })
            .addCase(loadProjects.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Failed to load projects'
            })
            .addCase(removeProject.fulfilled, (state, action) => {
                state.items = state.items.filter((t) => t.id !== action.payload)
            })
            .addCase(removeProject.rejected, (state, action) => {
                state.error = action.error.message ?? 'Failed to delete task'
            })
    }

})

export default projectSlice.reducer