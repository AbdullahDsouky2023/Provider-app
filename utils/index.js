import axios from "axios";
import {    EXPO_PUBLIC_BASE_URL} from "@env"
const api = axios.create({
  baseURL:     EXPO_PUBLIC_BASE_URL, // Set your base URL
});

export default  api


