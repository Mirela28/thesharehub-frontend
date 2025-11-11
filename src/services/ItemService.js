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

export const searchItems = async (filters = {}) => {
    try {
        const response = await axios.post('http://localhost:8080/items/search', filters, {
            withCredentials: true
        });
        if (response.status === 200) {
            return { success: true, data: response.data };
        }
    } catch (error) {
        if (error.response?.status === 400) {
            return { success: false, errorMessages: error.response.data };
        }
        return { success: false, errorMessages: ["An unexpected error occurred. Please try again."] };
    }
};

export const getItemById = async (itemId) => {
    try {
        const response = await axios.get(`http://localhost:8080/items/${itemId}`, {
            withCredentials: true
        });
        if (response.status === 200) {
            return { success: true, data: response.data };
        }
    } catch (error) {
        if (error.response?.status === 400) {
            return { success: false, errorMessages: error.response.data };
        }
        return { success: false, errorMessages: ["An unexpected error occurred. Please try again."] };
    }
};
