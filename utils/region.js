// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useQuery } from "@tanstack/react-query";
// import api from "./index";

// // const api = axios.create({
// //   baseURL: "http://192.168.1.5:1337", // Set your base URL
// // });

// export const SetRegionsInLocal = async (regions) => {
//   try {
//     await AsyncStorage.setItem("regions", JSON.stringify(regions));
//   } catch (error) {
//     console.error("Error updating manual locations:", error);
//   }
// };

// export default function useRegions() {
//   const fetchRegions = async () => {
//     try {
//       const response = await api.get(`/api/regions?populate=*`);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching regions:", error);
//       throw error;
//     }
//   };

//   const { data, isLoading, isError ,refetch} = useQuery({
//     queryKey: ["regions"],
//     queryFn: fetchRegions,
//   }); // Changed the query key to 'superheroes'

//   return {
//     refetch,
//     data,
//     isLoading,
//     isError,
//   };
// }

// export const getRegionsFromLocalStorage = async () => {
//   try {
//     const stroredRegions = await AsyncStorage.getItem("regions");
//     return stroredRegions ? JSON.parse(stroredRegions) : [];
//   } catch (error) {
//     console.error("Error getting manual regoins:", error);
//     return [];
//   }
// };
