import axios from "../axiosUtils";

export const signup = async (payload) => {
    const response = await axios.post('user/register', payload);
    const {refreshtoken, accesstoken, ...data} = response.data;
    localStorage.setItem('refreshtoken', refreshtoken);
    localStorage.setItem('accesstoken', accesstoken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`
    return data
}

export const login = async (payload) => {
    try {
        const response = await axios.post('user/login', payload);
        const {refreshtoken, accesstoken, ...data} = response.data;
        localStorage.setItem('refreshtoken', refreshtoken);
        localStorage.setItem('accesstoken', accesstoken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`
        return data
    } catch (error) {
        console.log(error);
        throw error
    }

}

export const getUser = async () => {
    try {
        const response = await axios.get('user');
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}
