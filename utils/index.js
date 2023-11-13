import axios from "axios";
import {BASE_URL} from "@env"
const api = axios.create({
  baseURL: BASE_URL, // Set your base URL
});

export default  api