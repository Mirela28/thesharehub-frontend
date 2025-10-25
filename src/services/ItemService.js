import axios from 'axios';

export const createItem = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8080/items', formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
        if (response.status === 201) {
            return { success: true, data: response.data };
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { success: false, errorMessages: error.response.data.errors };
        }
        return { success: false, errorMessages: ["An unexpected error occurred. Please try again."] };
    }
}