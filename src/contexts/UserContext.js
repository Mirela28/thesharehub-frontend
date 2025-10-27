import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:8080/users/me', {
                    withCredentials: true,
                });
                if (res.data.authenticated && res.data.user) {
                    setUser(res.data.user);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
