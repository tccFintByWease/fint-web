/* libraries */
import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
/* store */
import { LOGIN_URL } from './../store/api-urls';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storagedUser = localStorage.getItem('user');
        const storagedToken = localStorage.getItem('token');

        if (storagedUser && storagedToken) {
            axios.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

            setUser(JSON.parse(storagedUser));
        }
    }, [])

    async function signIn(userData) {
        const response = await axios.post(LOGIN_URL, userData);
        console.log(response);

        if (response.data.result.emailUsuario === userData.emailUsuario && response.data.result.senhaUsuario === userData.senhaUsuario) {
            setUser(response.data.result);

            // ! axios.defaults.headers['Authorization'] = `Bearer ${response.token}`;
            axios.defaults.headers['Authorization'] = `Bearer token de mentirinha`;

            localStorage.setItem('user', JSON.stringify(response.data.result));
            // ! localStorage.setItem('token', response.token);
            localStorage.setItem('token', 'token de mentirinha');
        }

        return response;
    }

    function updateUser(user) {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
    }
    
    function signOut() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{signed: !!user, user, signIn, signOut, updateUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}