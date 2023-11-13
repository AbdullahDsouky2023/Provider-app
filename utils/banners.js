import { useQuery } from '@tanstack/react-query';
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.6:1337", // Set your base URL
});




 export default function useBanners() {
  const fetchBanners = async () => {
    try {
      const response = await api.get(`/api/banners?populate=*`);
      
      return response.data
    } catch (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }
  };

  const { data, isLoading,isError } = useQuery(
    { queryKey: ["banners"], queryFn: fetchBanners }
  ); // Changed the query key to 'superheroes'
  
  return {
    data,
    isLoading,
    isError
  };
}


