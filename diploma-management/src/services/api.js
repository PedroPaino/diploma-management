import axios from 'axios';

const API_URL = 'http://localhost:5000/api/diplomas';

export const fetchDiplomas = async () => {
try {
    const response = await axios.get(API_URL);
    return response.data;
} catch (error) {
    console.error('Error fetching diplomas:', error);
    throw error;
}
};
export const addDiploma = async (diplomaData) => {
    try {
        const response = await axios.post(API_URL, diplomaData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateDiploma = async (id, diplomaData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, diplomaData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteDiploma = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        throw error;
    }
};
