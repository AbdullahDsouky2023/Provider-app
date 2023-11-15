import { useQuery } from '@tanstack/react-query';
import api from './index'



 export default function useCategories() {
  const fetchCategories = async () => {
    try {
      const response = await api.get(`/api/categories?populate=*`);
      
      return response.data
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };

  const { data, isLoading,isError } = useQuery(
    { queryKey: ["categories"], queryFn: fetchCategories }
  ); // Changed the query key to 'superheroes'
  
  return {
    data,
    isLoading,
    isError
  };
}


