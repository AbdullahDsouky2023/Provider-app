import { useQuery } from '@tanstack/react-query';
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.6:1337", // Set your base URL
});




 export default function useReviews() {
  const fetchReviews = async () => {
    try {
      const response = await api.get(`/api/reviews?populate=*`);
      
      return response.data
    } catch (error) {
      console.error("Error fetching reviews:", error);
      throw error;
    }
  };

  const { data, isLoading,isError } = useQuery(
    { queryKey: ["reviews"], queryFn: fetchReviews }
  ); // Changed the query key to 'superheroes'
  
  return {
    data,
    isLoading,
    isError
  };
}


