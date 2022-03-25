import React, { useEffect, useMemo, useState } from 'react';
import { node } from 'prop-types';
import useUserEndpoint from './useUserEndpoint';
import {
 getUser, removeUser, updateUser,
} from '../services/localStorageService';

const UserContext = React.createContext(undefined);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { signupApi, loginApi } = useUserEndpoint();

    useEffect(async () => {
        if (!user) {
            const localStorageUser = getUser();
            setUser(localStorageUser);
        }
    }, []);

    const logout = (() => {
        removeUser();
        setUser(null);
    });

    const login = async (loginUser) => {
        const {
            data: { token },
        } = await loginApi(loginUser);
        setUser(loginUser);
        updateUser(token);
    };

    const register = async (registerUser) => {
        await signupApi(registerUser);
        return login(registerUser);
    };

    const value = useMemo(() => ({
        user, login, register, logout,
    }), [user]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: node.isRequired,
};

const useUser = () => {
    const context = React.useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');

    return context;
};

export { useUser, UserProvider };
