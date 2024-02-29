import { useQuery } from "@tanstack/react-query";
// import api from './index';

import api from "./index";

// const api = axios.create({
//   baseURL: "http://192.168.1.5:1337",
//   headers: {
//     "Content-Type": "application/json",
//   }, // Set your base URL
// });

export const postOrder = async (values) => {
  try {
    const res = await axios.post("http://192.168.1.4:1337/api/orders", {
      data: {
        ...values,
      },
    });
    return res?.data?.data?.id ? res?.data?.data?.id : null;
  } catch (error) {
    console.error("Error:", error.message); // Log the error response
  }
};
export const delay_order_request = async (values) => {
  try {
    const data = await api.post(`/api/delay-requests`, {
      data: {
        ...values,
      },
    });
    console.log("res delay data",data?.data?.data?.id)
    return data?.data?.data || null
  } catch (error) {
    console.error("Error 22:", error.message); // Log the error response
  }
};

export const cancleOrder = async (id) => {
  try {
    const data = await api.put(`/api/orders/${id}`, {
      data: {
        provider: null,
        status: "pending",
        chat_channel_id: null,
      },
    });
    if (data?.data?.data?.id) return true;
    return false;
  } catch (error) {
    console.error("Error accepting order   :", error.message); // Log the error response
  }
};
export const changeOrderStatus = async (id, status) => {
  try {
    const data = await api.put(`/api/orders/${id}`, {
      data: {
        status: status,
      },
    });
    if (data?.data?.data?.id) return true;
    return false;
  } catch (error) {
    console.error("Error accepting order   :", error.message); // Log the error response
  }
};
export const requestPayment = async (id) => {
  try {
    const data = await api.put(`/api/orders/${id}`, {
      data: {
        status: "payment_required",
        provider_payment_status:"payment_required"
      },
    });
    if (data?.data?.data?.id) return true;
    return false;
  } catch (error) {
    console.error("Error accepting order   :", error.message); // Log the error response
  }
};
export const UpdateOrder = async (id,data) => {
  try {
    const res= await api.put(`/api/orders/${id}`, {
      data: {
...data
      },
    });
    console.log("the rsult of reohohh",data,res?.data?.data?.id)
   return data,res?.data?.data?.id;
   
  } catch (error) {
    console.error("Error updaing order   :", error.message); // Log the error response
  }
};
export const acceptOrder = async (id, providerId, channel_id) => {
  try {
    const data = await api.put(`/api/orders/${id}`, {
      data: {
        provider: providerId,
        status: "assigned",
        chat_channel_id: channel_id,
      },
    });
    if (data?.data?.data?.id) return true;
    return false;
  } catch (error) {
    console.error("Error accepting order   :", error.message); // Log the error response
  }
};

export default function useOrders() {
  const fetchOrders = async () => {
    try {
      let allOrders = [];
      let page =   1; // Start with the first page
  
      while (true) {
        const response = await api.get(`/api/orders?populate=deep,4&pagination[page]=${parseInt(page, 10)}`);
        console.log("Response data orders:", response?.data?.meta); // Log the response data
       
        // Assuming response.data is an array, proceed with adding to the allOrders array
        const currentPageOrders = response?.data?.data || [];
        allOrders = [...allOrders, ...currentPageOrders];
       
        // Check if there is a next page in the pagination information
        const nextPage = response?.data?.meta?.pagination.pageCount;

        if (nextPage === page || nextPage === 0) {
           break; // No more pages, exit the loop
        }
       
        // Move to the next page
        page++;
       }
       
  
      return{
        data: allOrders
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
      throw error;
    }
  };
  

  const { data, isLoading, isError,refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    refetchIntervalInBackground:true,
  })

  return {
    refetch,
    data,
    isLoading,
    isError,
  };
}

export function useOrder() {
  const fetchOrders = async () => {
    try {
      const response = await api.get(`/api/orders?populate=deep/${id}`);

      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["singleorder"],
    queryFn: fetchOrders,
  
  }); // Changed the query key to 'superheroes'

  return {
    data,
    isLoading,
    isError,
  };
}
