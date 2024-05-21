import axios from "../axiosUtils"
export const createowner = async (payload) => {
    const response = await axios.post('owner', payload, {headers: {'Content-Type': 'multipart/form-data'}});
    console.log(response.data);

    const {refreshtoken, accesstoken, ...savedOwner} = response.data;
    localStorage.setItem('refreshtoken', refreshtoken);
    localStorage.setItem('accesstoken', accesstoken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`

    return savedOwner
}

export const editowner = async (payload) => {
    const form = new FormData();
    payload.address = JSON.stringify(payload.address)
    Object.entries(payload).forEach(([key, val]) => {form.append(key, val)});
    console.log(form)
    const response = await axios.put('owner/', form, {headers: {'Content-Type': 'multipart/form-data'}});
    return response.data
}