import { useQuery } from '@tanstack/react-query';
import api from './index'

 export default function useTerms() {
  const fetchTerms = async () => {
    try {
      const response = await api.get(`/api/terms?populate=*`);
      
      return response.data
    } catch (error) {
      console.error("Error fetching Terms:", error);
      throw error;
    }
  };

  const { data, isLoading,isError } = useQuery(
    { queryKey: ["Terms"], queryFn: fetchTerms }
  ); // Changed the query key to 'superheroes'
  
  return {
    data,
    isLoading,
    isError
  };
}


