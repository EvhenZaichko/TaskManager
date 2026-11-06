import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { useAppDispatch } from './store'
import { loadTasks } from './store/tasksSlice.ts'

import RootLayout from './layouts/RootLayout.tsx'
import BoardLayout from './layouts/BoardLayout.tsx'

import Login from './pages/Login.tsx'
import Registration from './pages/Registration.tsx'
import Projects from './pages/Projects.tsx'
import Board from './pages/Board.tsx'
import Backlog from './pages/Backlog.tsx'
import Tune from './pages/Tune.tsx'

function App() {
    const isAuth: boolean = true


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