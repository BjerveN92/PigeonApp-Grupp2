
import axios from "axios";
const BASE_URL = 'http://localhost:8080/api/issues';

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