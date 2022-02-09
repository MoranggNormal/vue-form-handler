import axios from "axios";

export const baseUrl = axios.create({
  baseURL: `http://localhost:9090/user/`,
});
