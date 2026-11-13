import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authApi from '../api/authApi.ts'
import type {LoginBody, RegistrationBody, User} from '../types/userTypes'


export const registration = createAsyncThunk(
    'auth/registration',
    async(body: RegistrationBody)=> {
        const data = await authApi.registration(body)
        localStorage.setItem('token', data.token)
        return data.user
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async(body: LoginBody) => {
        const data = await authApi.login(body)
        localStorage.setItem('token', data.token)
        return data.user
    }
)

export const checkAuth = createAsyncThunk(
    'auth/me',
    async() => {
        return await authApi.me()
    }
)

export const updateUsername = createAsyncThunk(
    'auth/updateUsername',
    async(body: {username: string}) => {
        return await authApi.updateUsername(body)
    }
)

type AuthState = {
    user: User | null
    loading: boolean        // for login and reg
    checking: boolean       // for checking token
    error: string | null
}

const initialState: AuthState = {
    user: null,
    loading: false,
    checking: !!localStorage.getItem('token'),
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token')
            state.user = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(registration.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Registration failed'
            })
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message ?? 'Login failed'
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.checking = false
                state.user = action.payload
            })
            .addCase(checkAuth.rejected, (state) => {
                state.checking = false
                state.user = null
            })
            .addCase(updateUsername.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer