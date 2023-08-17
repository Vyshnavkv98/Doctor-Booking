import axios from 'axios';
import {baseUrl} from '../constants/constant'

const accessToken = localStorage.getItem('access-token');
const refreshToken = localStorage.getItem('refresh-token');
console.log(baseUrl,'Axios base url');
const instance = axios.create({
    baseURL:baseUrl,
    headers:{
        Authorization: `Bearer ${accessToken}`,
    }
    
});

const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/api/refresh-token', { refreshToken });
      const newAccessToken = response.data.accessToken;
  
      localStorage.setItem('access-token', newAccessToken);
  
      instance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
    } catch (error) {
     console.log(error);
    }
  };



  
export default instance;