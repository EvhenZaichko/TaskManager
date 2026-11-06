import {useCurrentProjectId} from "../hooks/useCurrentProjectId.ts"
import { useAppSelector} from "../store";

export const useCurrentProject = () => {
    const id = useCurrentProjectId()
    return useAppSelector((state) => state.projects.items.find((p) => p.id === id))
}