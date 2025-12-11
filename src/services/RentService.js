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

export const getReceivedRequests = async ({ page, size }) => {
    try {
        const response = await axios.get('http://localhost:8080/rents/receivedrequests', { params: { page, size }, withCredentials: true });
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
        const response = await axios.get('http://localhost:8080/rents/sentrequests', { params: { page, size }, withCredentials: true });
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
        const response = await axios.put('http://localhost:8080/rents',
            { id: rentId, status: newStatus},
            { withCredentials: true });
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