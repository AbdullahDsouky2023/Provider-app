import { setUserData } from "../app/store/features/userSlice";
import api from "./index";

export const createUser = async (data) => {
  try {
    const createdUser = await api.post("/api/providers", {
      data: {
        ...data,
      },
    });
    return createdUser;
  } catch (error) {
    console.log("Error creating the user ", error);
  }
};
export const getUserByPhoneNumber = async (phone) => {
  try {
    // Remove the "+" symbol
    // +201144254129
    if (phone) {
      const user = await api.get(
        `/api/providers?populate=*&filters[$and][0][phoneNumber][$eq]=` + phone
      );
      if (
        user?.data?.data[0]?.attributes &&
        user?.data?.data[0]?.attributes?.phoneNumber
      ) {
        setUserData(user?.data?.data);
        return user?.data?.data[0];
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log("Error creating the user ", error.message);
  }
};
export const getUserCurrentOrders = async (id) => {
  try {
    if (id) {
      const user = await api.get(`/api/providers/${id}?populate=*`);
      return user?.data?.data?.attributes?.orders?.data;
    }
  } catch (error) {
    console.log("Error getting the user ", error.message);
  }
};
export const updateUserData = async (id, data) => {
  try {
    const updatedUser = await api.put(`/api/providers/${id}`, {
      data: {
        ...data,
      },
    });
    if (updatedUser?.data?.data) return true;
    return false;
  } catch (error) {
    console.log("error updating the user ", error.message);
  }
};
