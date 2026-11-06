export type Project = {
    id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
}

export type CreateProjectBody = {
    title: string
}