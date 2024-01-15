import axios from 'axios';

const baseURL = 'http://localhost:1337/api/articles/';

const instance = axios.create({
  baseURL,
});

export default instance;