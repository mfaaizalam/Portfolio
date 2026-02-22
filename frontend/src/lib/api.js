// api.js
import { axiosInstance } from "./axios"; // relative path check karo

export const submitContactForm = async (submitForm) => {
  try {
    const response = await axiosInstance.post("/contact", submitForm); // send form
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Server Error" };
  }
};