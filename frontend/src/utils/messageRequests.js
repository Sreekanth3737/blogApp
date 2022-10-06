import axios from 'axios'
import axiosInstance from "./api_instance";
const API = axios.create({ baseURL: 'http://localhost:5000' });



export const getMessages=(id)=>axiosInstance.get(`/api/message/${id}`)
export const addMessage=(data)=>axiosInstance.post('/api/message',data)