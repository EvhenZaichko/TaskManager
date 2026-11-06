import {api} from "./axios.ts";
import type { Priority, Status, Task, UpdateTaskBody, CreateTaskBody } from '../types/taskTypes'



export const create = async (body: CreateTaskBody) => {
    const {data} = await api.post<Task>(`tasks/createTask`, body)
    return data
}

export const load = async (id: string) => {
    const {data} = await api.get<Task[]>(`tasks/loadTasks/${id}`)
    return data
}

export const changeStatus = async (id: string, status: Status) => {
    const {data} = await api.patch<Task>(`tasks/changeStatus/${id}`, {status})
    return data
}

export const changePriority = async (id: string, priority: Priority)=> {
    const {data} = await api.patch<Task>(`tasks/changePriority/${id}`, {priority})
    return data
}

export const update = async (id: string, changes: UpdateTaskBody ) => {
    const {data} = await api.patch<Task>(`tasks/Update/${id}`, changes)
    return data
}

export const remove = async (id: string)=> {
    const {data} = await api.delete<string>(`tasks/removeTask/${id}`)
    return data
}