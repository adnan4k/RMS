import axios from '../axiosUtils'
export const createHouse = async (formData) => {

  const response = await axios.post('http://localhost:4001/house/', formData, {headers: {
    'Content-Type': `multipart/form-data;`,
      },})
      console.log(response.data,'response')
      return response.data;
};

export const getHouse = async() =>{
  try {
    const response = await axios.get('house/')
    console.log(response.data,'here is axios')
    return response.data;
  } catch (error) {
    console.log(error,'here is axios')
    throw error;
  }
}