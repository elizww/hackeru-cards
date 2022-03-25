import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const useUserEndpoint = () => {
    const signupApi = (user) => {
        // eslint-disable-next-line no-console
        console.log({ user });
        return axios.post(`${apiUrl}/users/register`, user);
    };

    const loginApi = ({ email, password }) => axios.post(`${apiUrl}/users/login`, { email, password });

    return { signupApi, loginApi };
};

export default useUserEndpoint;
