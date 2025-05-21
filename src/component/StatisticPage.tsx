import { TheBarChart } from "./BarChart";
import { getFinishedProject } from "../utils/ProjectApi";
import type { Project } from "../type/Interface";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export function StatisticPage() {
    const navigate = useNavigate();
    const backToHome = () => {
          navigate("/");
    };
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    // fetchar färdiga projekt 
    useEffect (() => {
        async function fetchProjects() {
            try {
                const data = await getFinishedProject();
                setProjects(data);
                if (data.length > 0) setSelectedProject(data[0]);
            } catch (error) {
                console.error("Kunde inte hämta projekt", error);
            }
        }
        fetchProjects();
    }, []);
    // funktion som hanterar valen i dropdown menyn
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const project = projects.find(p => p.projectId === e.target.value);
        setSelectedProject(project ?? null);
    };


    if (!selectedProject || !selectedProject.projectId || !selectedProject.title) {
        return <div>Laddar projekt...</div>
    }

    return (
        <>
                <div>
            <Button 
                variant="danger" 
                onClick={backToHome}>
                Tillbaka
            </Button>
        </div>
        <div>
            <label>
                Välj projekt:{" "}
                <select value={selectedProject.projectId} onChange={handleChange}>
                    {projects.map(project => (
                        <option key={project.projectId} value={project.projectId}>
                            {project.title}
                        </option>
                    ))}
                </select>
            </label>
            <TheBarChart 
                projectId={selectedProject.projectId} 
                projectTitle={selectedProject.title}
            />

        </div>


        </>
    );
}