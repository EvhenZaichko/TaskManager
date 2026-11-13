import {api} from "./axios.ts";
import type {AuthResponse, LoginBody, RegistrationBody, User} from "../types/userTypes.ts";

export const registration = async (body: RegistrationBody) => {
    const {data} = await api.post<AuthResponse>('users/registration', body)
    return data
}

export const login = async (body: LoginBody) => {
    const {data} = await api.post<AuthResponse>('users/login', body)
    return data
}

export const me = async () => {
    const {data} = await api.get<User>('users/me')
    return data
}

export const updateUsername = async  (body: {username: string}) => {
    const {data} = await api.patch<User>('users/updateUsername', body)
    return data
}