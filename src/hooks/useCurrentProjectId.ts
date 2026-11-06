import { useMatch } from 'react-router'

export const useCurrentProjectId = () => {
    const match = useMatch('/projects/:id/*')
    return match?.params.id ?? null
}