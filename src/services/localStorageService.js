import JwtDecode from 'jwt-decode';

const USER_KEY = 'token';

const getUser = () => {
    try {
        const token = localStorage.getItem(USER_KEY);
        return JwtDecode(token);
    } catch {
        return null;
    }
};

const removeUser = () => {
    localStorage.removeItem(USER_KEY);
};

const updateUser = (user) => {
    localStorage.setItem(USER_KEY, user);
};

export {
 updateUser, getUser, removeUser,
};
