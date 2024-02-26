import { useQuery } from '@tanstack/react-query';
import api from './index'



 export default function useCategories() {
  const fetchCategories = async () => {
    try {
      let allCategories = [];
      let page =   1; // Start with the first page
  
      while (true) {
        const response = await api.get(`/api/categories?populate=*&pagination[page]=${parseInt(page,   10)}`);
        console.log("Response data:", response?.data?.data?.length); // Log the response data
  
        // Assuming response.data is an array, proceed with adding to the allCategories array
        const currentPageCategories = response?.data?.data || [];
        allCategories = [...allCategories, ...currentPageCategories];
  
        // Check if there is a next page in the pagination information
        const nextPage = response?.data?.meta?.pagination.pageCount;
        if (nextPage === page) {
          break; // No more pages, exit the loop
        }
  
        // Move to the next page
        page++;
      }
  
      return allCategories;
    } catch (error) {
      console.log("Error fetching categories:", error);
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


