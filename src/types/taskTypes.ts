export type Status = 'backlog'|'todo' | 'in_progress' | 'in_review' | 'done'

export type Priority = 'High' | 'Medium' | 'Low'

export type Task = {
    id: string
    title: string
    description?: string
    status: Status
    priority: Priority
    project: string
}

export type CreateTaskBody = {
    title: string
    priority: Priority
    description?: string
    status?: Status
    project: string
}

export type UpdateTaskBody = {
    title?: string
    description?: string
    priority?: Priority
    status?: Status
}