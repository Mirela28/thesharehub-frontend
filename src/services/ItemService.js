import { api } from './client';

export const createItem = async (formData) => {
    try {
        const response = await api.post('http://localhost:8080/items', formData,
            {
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
        const response = await api.post('http://localhost:8080/items/search', filters);
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
        const response = await api.get(`http://localhost:8080/items/${itemId}`);
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

export const getUserRentedItems = async ({ page, size }) => {
    try {
        const response = await api.get(`http://localhost:8080/items/user/rented-items`, {
            params: { page, size },
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

export const getUserOfferedItems = async ({ page, size }) => {
    try {
        const response = await api.get(`http://localhost:8080/items/user/offered-items`, {
            params: { page, size },
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

export const getTop3RentedItems = async () => {
    try {
        const response = await api.get(`http://localhost:8080/items/top-rentals`);
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
