import axios from 'axios';

const api = axios.create({
  baseURL: 'https://todolist-y8j6.onrender.com',
});

export default api;
