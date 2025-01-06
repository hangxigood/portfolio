import ProjectCard from '../../components/ProjectCard';
import { getAllProjects, Project } from '../../lib/projects';

export default function ProjectsPage() {
    const projects: Project[] = getAllProjects();

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.slug}
                        {...project}
                    />
                ))}
            </div>
        </div>
    );
}
