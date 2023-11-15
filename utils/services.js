import { useQuery } from '@tanstack/react-query';
// import api from './index';
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.5:1337/", // Set your base URL
});



export default function useServices() {
  const fetchCategories = async () => {
    try {
      const response = await api.get(`/api/services?populate=*`);
      
      return response.data
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const { data , isLoading,isError } = useQuery(
    { queryKey: ["services"], queryFn: fetchCategories }
  ); // Changed the query key to 'superheroes'
  
  return {
    data,
    isLoading,
    isError
  };
}


