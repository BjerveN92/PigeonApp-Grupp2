import axios from "axios";

const BASE_MEMBRES_URL = 'https://api-pigeonapp-grupp2.onrender.com/api/members';

export async function getMembersByProjectId(projectId: string) {
    const response = await axios.get(`${BASE_MEMBRES_URL}/getMembersByProjectId/${projectId}`);
    return response.data;
}
