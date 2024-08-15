import axios from 'axios'

const newRequest = axios.create({
  baseURL: 'http://localhost:5000/api',
  //   baseURL: 'https://lynxmart-api.onrender.com/api',
})

export default newRequest
