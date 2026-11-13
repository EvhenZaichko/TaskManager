import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { useAppDispatch, useAppSelector } from './store'
import { checkAuth } from './store/authSlice.ts'

import RootLayout from './layouts/RootLayout.tsx'
import BoardLayout from './layouts/BoardLayout.tsx'

import Login from './pages/Login.tsx'
import Profile from './pages/Profile.tsx'
import Registration from './pages/Registration.tsx'
import Projects from './pages/Projects.tsx'
import Board from './pages/Board.tsx'
import Backlog from './pages/Backlog.tsx'
import Tune from './pages/Tune.tsx'
import Spinner from "./UI/Spinner.tsx";

function App() {
    const dispatch = useAppDispatch()
    const { user, checking } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [dispatch])

    if (checking) {
        return (
            <div className="flex min-h-screen items-center justify-center text-muted">
                <Spinner/>
            </div>
        )
    }

    const isAuth = !!user

    if (!isAuth) return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )

    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path="/projects" element={<Projects />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/projects/:id" element={<BoardLayout />}>
                    <Route path="board" element={<Board />} />
                    <Route path="backlog" element={<Backlog />} />
                    <Route path="tune" element={<Tune />} />
                </Route>

                <Route path="*" element={<Navigate to="/projects" replace />} />
            </Route>
        </Routes>
    )
}

export default App