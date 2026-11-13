export type User = {
    id: string
    username: string
    email: string
    createdAt: string
}

export type RegistrationBody = {
    username: string;
    email: string;
    password: string }

export type LoginBody = {
    email: string;
    password: string }


export type AuthResponse = {
    token: string;
    user: User
}