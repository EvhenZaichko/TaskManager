import {api} from "./axios.ts";
import type {Project, CreateProjectBody} from "../types/projectTypes.ts";




export const create = async (body: CreateProjectBody)=> {
    const {data} = await api.post<Project>('projects/createProject', body)
    return data
}

export const load = async () => {
    const {data} = await api.get<Project[]>('projects/loadProjects')
    return data
}

export const remove = async(id: string) => {
    const {data} = await api.delete<string>(`projects/removeProject/${id}`)
    return data
}