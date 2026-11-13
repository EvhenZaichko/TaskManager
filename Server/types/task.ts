export const STATUSES = ['backlog', 'todo', 'in_progress', 'in_review', 'done'] as const
export const PRIORITIES = ['High', 'Medium', 'Low'] as const


export type Status = (typeof STATUSES)[number]
export type Priority = (typeof PRIORITIES)[number]
