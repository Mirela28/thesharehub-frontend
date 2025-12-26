import { api } from './client';

export const createRent = async (rentData) => {
    try {
        const response = await api.post('http://localhost:8080/rents', rentData);
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

export const getReceivedRequests = async ({ page, size }) => {
    try {
        const response = await api.get('http://localhost:8080/rents/receivedrequests', { params: { page, size }, });
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

export const getSentRequests = async ({ page, size }) => {
    try {
        const response = await api.get('http://localhost:8080/rents/sentrequests', { params: { page, size }, });
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

export const changeStatus = async (rentId, newStatus) => {
    try {
        const response = await api.put('http://localhost:8080/rents',
            { id: rentId, status: newStatus});
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

export const getApprovedRentDates = async (itemId) => {
    try {
        const response = await api.get(`http://localhost:8080/rents/approvedrents/${itemId}`);
        if (response.status === 200) {
            return { success: true, data: response.data };
        }
    } catch (error) {
        if (error.response?.status === 400) {
            return { success: false, errorMessages: error.response.data };
        }
        return { success: false, errorMessages: ["Could not load unavailable dates."] };
    }
};