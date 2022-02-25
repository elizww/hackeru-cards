import React, { useMemo } from 'react';
import { node } from 'prop-types';

const UserContext = React.createContext(undefined);

const stubUser = {
    _id: 'user-1',
    name: 'adi',
    email: 'adi@example.som',
    password: 'passcode',
    biz: true,
    cards: [],
    createdAt: '2022-02-13T23:43:03.481+00:00',
};

const UserProvider = ({ children }) => {
    const value = useMemo(() => ({ user: stubUser }), []);

    return (
        <UserContext.Provider value={value}>
            { children }
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
