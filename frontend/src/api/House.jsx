import axios from "axios"
export const createHouse = async (userData) => {
  axios.post('https://jsonplaceholder.typicode.com/user', userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    })
};

