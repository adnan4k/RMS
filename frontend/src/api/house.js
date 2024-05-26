import axios from '../axiosUtils'
export const createHouse = async (formData) => {

  const response = await axios.post('http://localhost:4001/house/', formData, {headers: {
    'Content-Type': `multipart/form-data;`,
      },})
      return response.data;
};

export const getHouse = async() =>{
  try {
    const response = await axios.get('house/')
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const getLatestHouses = async() =>{
  const response = await axios.get('/house/latest')
  console.log(response.data,'my houses')
  return response.data
  
}