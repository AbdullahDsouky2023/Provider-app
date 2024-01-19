import { useQuery } from "@tanstack/react-query";
// import api from './index';

import api from "./index";
export const CreateAdditionalPrice = async (values) => {
    try {
      const res = await api.post("/api/additional-prices", {
        data: {
          ...values,
        },
      });
      return res?.data ;
    } catch (error) {
      console.error("Error: creaign addional", error.message); // Log the error response
    }
  };