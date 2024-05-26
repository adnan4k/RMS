import axios from '../axiosUtils'
export const createHouse = async (formData) => {

  const response = await axios.post('http://localhost:4001/house/', formData, {headers: {
    'Content-Type': `multipart/form-data;`,
      },})
      return response.data;
};

export const getHouse = async() =>{
  const response = await axios.get('house/')
  return response.data
}
export const getLatestHouses = async() =>{
  const response = await axios.get('/house/latest')
  return response.data
  
}