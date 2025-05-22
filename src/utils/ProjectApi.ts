import axios from "axios";
import type { Project } from "../type/Interface";
const BASE_URL = "https://api-pigeonapp-grupp2.onrender.com/api/projects";


// Skapa nytt projekt
 export async function postProject(project:Project){
    try{
        const respone = await axios.post(`${BASE_URL}/newProject`,project );
        return respone.data;
    }
    catch (error){
        console.error("Error creating project:", error);
        throw error;
    }

}
// hämta activa projekt
export async function getActiveProject() {
     try{
        const respone = await axios.get(`${BASE_URL}/activeProjects`);
        return respone.data;
    }
    catch (error){
        console.error("Error creating project:", error);
        throw error;
    }
}

//hämta färdiga projekt
export async function getFinishedProject() {
    try{
        const respone = await axios.get(`${BASE_URL}/finishedProjects`);
        return respone.data;
    }
    catch (error){
        console.error("Error creating project:", error);
        throw error;
    }
}

// hämta projekt med id
export async function getProjectById(projectId: string) {
    try{
        const respone = await axios.get(`${BASE_URL}/${projectId}`);
        return respone.data;
    }
    catch (error){
        console.error("Error creating project:", error);
        throw error;
    }
}

// hämta alla projekt oavsett status
export async function getAllProjects() {
    try {
        const respone = await axios.get(`${BASE_URL}/allProjects`);
        return respone.data;
    } catch (error) {
        console.error("Error getting projects:", error);
    }
}

    export async function updateProjectStatus(projectId : string){
       try {
        const respone = await axios.patch(`${BASE_URL}/updateProjectStatus/${projectId}`);
        return respone.data;
    } catch (error) {
        console.error("Error getting projects:", error);
    }

    }

