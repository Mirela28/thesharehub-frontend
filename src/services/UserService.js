import { api } from './client';

export const registerUser = async (credentials) => {
    try {
        const response = await api.post('http://localhost:8080/users', credentials);
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


export const loginUser = async (credentials) => {
    try {
        const response = await api.post('http://localhost:8080/users/login', credentials);
        if (response.status === 200) {
            return { success: true, data: response.data }
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { success: false, errorMessages: error.response.data }
        }
        return { success: false, errorMessages: ["An unexpected error occurred. Please try again."] };
    }
}

export const logoutUser = async () => {
    try {
      const response = await api.post('http://localhost:8080/users/logout', 
        {}
      );
      if (response.status === 200) {
        return { success: true }
      }
    } catch (error) {
      if ((error.response && error.response.status === 400))
      return { success: false }
    } 
    return { success: false, errorMessages: ["An unexpected error occurred. Please try again."] };
}


export const updateUser = async (credentials) => {
    try {
        const response = await api.put('http://localhost:8080/users', credentials);
        if (response.status === 200) {
            return { success: true, data: response.data }
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { success: false, errorMessages: error.response.data}
        }
        return { success: false, errorMessages: ["An unexpected error occurred. Please try again."] };
    }
}

export const getUserById = async (userId) => {
    try {
        const response = await api.get(`http://localhost:8080/users/${userId}`);
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