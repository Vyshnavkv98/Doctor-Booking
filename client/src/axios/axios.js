import axios from 'axios';
import { baseUrl } from '../constants/constant'
import { toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners'


const refreshToken = localStorage.getItem('refresh-token');
const instance = axios.create({
  baseURL: baseUrl,


});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access-token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error);

    if (error.response.status === 500) {
      toast.error(`internal server error`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500
      })
    }

    if (error.response.status === 403) {
      localStorage.removeItem('access-token')
      window.location.href = '/login'
    } else {

      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500
      });

      return Promise.reject(error);
    }


  }

)

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