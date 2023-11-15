import { useQuery } from "@tanstack/react-query";
// import api from './index';

import api from './index'

// const api = axios.create({
//   baseURL: "http://192.168.1.5:1337",
//   headers: {
//     "Content-Type": "application/json",
//   }, // Set your base URL
// });

export const postOrder = async (values) => {
  try {
    const res = await axios.post("http://192.168.1.6:1337/api/orders", {
      data: {
        ...values,
      },
    });
    console.log("thih badbo", res.data.data.id);
    return res?.data?.data?.id ? res?.data?.data?.id : null;
  } catch (error) {
    console.error("Error:", error.message); // Log the error response
  }
};

export const cancleOrder = async (id) => {
  try {
    const data = await api.put(`/api/orders/${id}`,{
      data:{
        provider:null,
        status:"pending"
      }
    });
    console.log("******************** was deleted", data?.data?.data?.id);
    if ( data?.data?.data?.id) return true
    return false;
  } catch (error) {
    console.error("Error accepting order   :", error.message); // Log the error response
  }
};
export const changeOrderStatus = async (id,status) => {
  try {
    const data = await api.put(`/api/orders/${id}`,{
      data:{
        status:status,

      }
    });
    console.log("******************** was finsihed", data?.data?.data?.id);
    if ( data?.data?.data?.id) return true
    return false;
  } catch (error) {
    console.error("Error accepting order   :", error.message); // Log the error response
  }
};
export const requestPayment = async (id) => {
  try {
    const data = await api.put(`/api/orders/${id}`,{
      data:{
        PaymentStatus:"payment required"
      }
    });
    console.log("******************** was finsihed", data?.data?.data?.id);
    if ( data?.data?.data?.id) return true
    return false;
  } catch (error) {
    console.error("Error accepting order   :", error.message); // Log the error response
  }
};
export const acceptOrder = async (id,providerId) => {
  try {
    const data = await api.put(`/api/orders/${id}`,{
      data:{
        provider:providerId,
        status:"assigned"
      }
    });
    console.log("********************", data?.data?.data?.id);
    if (data?.data?.data?.id) return true
    return false;
  } catch (error) {
    console.error("Error accepting order   :", error.message); // Log the error response
  }
};

export default function useOrders() {
  const fetchOrders = async () => {
    try {
      const response = await api.get(`/api/orders?populate=*`);

      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order"],
    queryFn: fetchOrders,
  }); // Changed the query key to 'superheroes'

  return {
    data,
    isLoading,
    isError,
  };
}
