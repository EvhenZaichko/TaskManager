
import { Plus } from 'lucide-react'
import ProjectCard from '../components/projectCard.tsx'
import { useAppDispatch, useAppSelector } from '../store'
import { openCreateProject } from '../store/modalSlice.ts'


const Projects = () => {
    const dispatch = useAppDispatch()
    const projects = useAppSelector((state) => state.projects.items)



    return (
        <div className="flex w-full flex-1">
            <div className="flex w-full flex-col px-6 py-5 md:px-20">
                <h1 className="mb-10 text-center text-4xl font-bold">Projects</h1>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} title={project.title} id={project.id} />
                    ))}

                    <button
                        type="button"
                        onClick={() => dispatch(openCreateProject())}
                        className="group flex h-70 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-line text-muted transition duration-200 hover:-translate-y-1 hover:border-accent hover:bg-accent-soft hover:text-accent"
                    >
                        <div className="flex size-12 items-center justify-center rounded-xl bg-surface-hover transition group-hover:scale-110 group-hover:bg-accent group-hover:text-white">
                            <Plus size={24} />
                        </div>
                        <span className="text-sm font-semibold">New project</span>
                        <span className="text-xs text-muted/70">Create a board for your tasks</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Projects