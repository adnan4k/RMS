import axios from '../axiosUtils';

export const getTenant = async (tenantid) => {
    try {
        const response = await axios.get(`tenant/id`);
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const editTenant = async (payload) => {
    const response = await axios.put('tenant/', payload, {headers: {'Content-Type': 'multipart/form-data'}});
    return response.data;
}

export const createMaintenance = async ({_id, description}) => {
    let response = null 
    if (_id)
        response = await axios.put('tenant/maintenance/'+_id, {description});
    else
        response = await axios.post('tenant/maintenance', {description});
    return response.data;
}

export const fetchMaintenance = async (payload) => {
    const response = await axios.get('tenant/maintenance', payload);
    return response.data;
}
