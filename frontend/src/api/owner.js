import axios from "../axiosUtils"
export const createowner = async (payload) => {
    const response = await axios.post('owner', payload, {headers: {'Content-Type': 'multipart/form-data'}});
    return response.data
}