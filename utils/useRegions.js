// import { useQuery } from "@tanstack/react-query";
// import api from "./index";

// export default function useRegions() {
//   const fetchRegions = async () => {
//     try {
//       const response = await api.get(`/api/regions?populate=deep`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching Regions:", error);
//       throw error;
//     }
//   };

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["Regions"],
//     queryFn: fetchRegions,
//   }); // Changed the query key to 'superheroes'

//   return {
//     data,
//     isLoading,
//     isError,
//   };
// }
