import axios from "../axiosUtils";

export const signup = async (payload) => {
    const response = await axios.post('user/register', payload);
    const {refreshtoken, accesstoken, ...data} = response.data;
    localStorage.setItem('token', refreshtoken);
    axios.defaults.headers['Authorization'] = `Bearer ${accesstoken}`
    return data
}

export const login = async (payload) => {
    const response = await axios.post('user/login', payload);
    const {refreshtoken, accesstoken, ...data} = response.data;;
    localStorage.setItem('token', refreshtoken);
    axios.defaults.headers['Authorization'] = `Bearer ${accesstoken}`
    return data
}

export const getUser = async () => {
    const response = await axios.post('user');
    return response.data;
}
