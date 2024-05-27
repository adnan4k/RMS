import axios from "../axiosUtils"
export const createowner = async (payload) => {
    const response = await axios.post('owner', payload, {headers: {'Content-Type': 'multipart/form-data'}});

    const {refreshtoken, accesstoken, ...savedOwner} = response.data;
    console.log(localStorage.getItem('accesstoken'))
    localStorage.setItem('refreshtoken', refreshtoken);
    localStorage.setItem('accesstoken', accesstoken);
    console.log(localStorage.getItem('accesstoken'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`;

    return savedOwner
}

export const editowner = async (payload) => {
    const form = new FormData();
    payload.address = JSON.stringify(payload.address)
    Object.entries(payload).forEach(([key, val]) => {form.append(key, val)});
    const response = await axios.put('owner/', form, {headers: {'Content-Type': 'multipart/form-data'}});
    return response.data
}

export const getHouses = async () => {
    const response = await axios.get('owner/houses')
    return response.data 
}

export const getSingleHouse = async (houseid) => {
    const response = await axios.get('owner/houses/'+houseid)
    return response.data 
}

export const addTenant = async({houseData,houseId}) =>{
     const response = await axios.post(`owner/${houseId}`,houseData);
     return response.data
}

export const cerateCallendar = async ({d, houseid}) => {
    const response = await axios.post(`owner/${houseid}/calendar`, {schedules: d});
    return response.data
}

export const editHouse = async ({data, houseid}) => {
    console.log(data)
    const response = await axios.put(`owner/${houseid}`, data);
    return response.data
}