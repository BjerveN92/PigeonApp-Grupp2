
import axios from "axios";
import type { EstimatedTime } from "../type/Interface";
const BASE_URL = 'http://localhost:8080/api/issues';
const BASE_EST_URL = 'http://localhost:8080/api/estTime';

export async function PostIssues() {
    try{
        const respone = await axios.post(`${BASE_URL}/newIssue`);
        return respone.data;
    }
    catch (error){
        console.error("Error creating project:", error);
        throw error;
    }

}


export async function GetInactiveIssue() {
    try{
        const respone = await axios.get(`${BASE_URL}/inactiveIssues`);
        return respone.data;
    }
    catch (error){
        console.error("Error creating project:", error);
        throw error;
    }

}

export async function ActiveIssue() {

     try{
        const respone = await axios.get(`${BASE_URL}/activeIssues`);
        return respone.data;
    }
    catch (error){
        console.error("Error creating project:", error);
        throw error;
    }
}

export async function FinishedIssues(){
     try{
        const respone = await axios.get(`${BASE_URL}/finishedIssues`);
        return respone.data;
    }
    catch (error){
        console.error("Error creating project:", error);
        throw error;
    }
}
//Skapar ett nytt issue kopplar till ett projekt
export async function postIssueToProject(projectId:string, issueData: { issueTitle: string, issueDescription: string}) {
    try{
        const respone = await axios.post(`${BASE_URL}/newIssue/${projectId}`, issueData);
        return respone.data;
    }
    catch (error){
        console.error("Kunde inte skapa issue:", error);
        throw error;
    }
}

//Funktion för att hämta inaktiva issues för ett projekt
export async function getInactiveIssus(projectId: string) {
    try{
        const response = await axios.get(`${BASE_URL}/inactiveIssues/${projectId}`);
        return response.data;
    }
    catch (error){
        console.error("Kunde inte hämta inaktiva issues för projektet:", error);
        throw error;
    }
}

//Funktion för att hämata ett specifikt issue by id
export async function getIssueById(issueId: string) {
    try{
        const response = await axios.get(`${BASE_URL}/${issueId}`);
        return response.data;
    }
    catch (error){
        console.error("Kunde inte hämta issue med id:", error);
        throw error;
    }
}
//Funktion för att lägga time estimate till en issue
export async function patchEstimatedTime(estTime: EstimatedTime, issueId: string) {
  try{
    const res = await axios.patch(`${BASE_EST_URL}/updateEstime/${issueId}`, estTime);
    return res.data;
  } 
  catch (error){
    console.error("Kunde inte skapa time estimate:", error);
    throw error;
  }


}
