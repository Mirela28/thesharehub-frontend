import axios from 'axios';

export const registerUser = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:8080/users', credentials, { withCredentials: true });
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
        const response = await axios.post('http://localhost:8080/users/login', credentials, { withCredentials: true });
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
      const response = await axios.post('http://localhost:8080/users/logout', 
        {},
        {withCredentials: true},
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
        const response = await axios.put('http://localhost:8080/users', credentials, { withCredentials: true });
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
        const response = await axios.get(`http://localhost:8080/users/${userId}`, {
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