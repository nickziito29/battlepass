import api from "./client";

export async function createAcademy(academy, ownerId) {
    const response = await api.post(`/academies?ownerId=${ownerId}`, academy);
    return response.data;
}

export async function addProfessor(academyId, userId) {
    const response = await api.post(`/academies/${academyId}/professors?userId=${userId}`);
    return response.data;
}

export async function addAthlete(academyId, userId) {
    const response = await api.post(`/academies/${academyId}/athletes?userId=${userId}`);
    return response.data;
}