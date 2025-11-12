import axios from 'axios';

export const createRent = async (rentData) => {
    try {
        const response = await axios.post('http://localhost:8080/rents', rentData, { withCredentials: true });
        if (response.status === 201) {
            return { success: true, data: response.data };
        }
    } catch (error) {
        if (error.response?.status === 400) {
            return { success: false, errorMessages: error.response.data };
        }
        return { success: false, errorMessages: ["An unexpected error occurred. Please try again."] };
    }
};