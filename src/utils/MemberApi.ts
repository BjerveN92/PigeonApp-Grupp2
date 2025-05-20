import axios from "axios";

const BASE_MEMBRES_URL = 'http://localhost:8080/api/members';

export async function getMembersByProjectId(projectId: string) {
    const response = await axios.get(`${BASE_MEMBRES_URL}/getMembersByProjectId/${projectId}`);
    return response.data;
}
