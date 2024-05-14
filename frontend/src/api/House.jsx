import axios from "axios"
export const createHouse = async (formData) => {
  console.log(formData)
  axios.head
  axios.post('http://localhost:4001/house/', formData, {headers: {
    'Content-Type': `multipart/form-data;`,
    // Add other headers as needed
  },})
    .then((response) => {
      console.log(response,'response')
      return response;
    })
    .catch((error) => {
      console.log(error,'error')
      return error;
    })
};

