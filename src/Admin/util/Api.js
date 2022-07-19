import axios from 'axios';
// development
// const baseURL = 'http://localhost:8000/';
// production
export const baseURL = 'http://avamgt.com:8000/';
export const subcriptionURL = `http://localhost:3000/api`;


export default axios.create({
  baseURL: baseURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
