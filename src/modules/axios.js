import axios from "axios";
import { API_URL } from "./constants";
axios.defaults.baseURL = API_URL;
export const Axios = axios;
