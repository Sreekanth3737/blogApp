import axios from 'axios'
import axiosInstance from "./api_instance";
const API = axios.create({ baseURL: 'http://localhost:5000' });



export const userChats=(id)=>axiosInstance.get(`/api/chat/${id}`)