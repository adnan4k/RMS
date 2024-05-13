import axios from "axios"
export const createHouse = async (formData) => {
  console.log(formData.images)
  axios.post('http://localhost:4001/house/create', formData)
    .then((response) => {
      console.log(response,'response')
      return response;
    })
    .catch((error) => {
      console.log(error,'error')
      return error;
    })
};

