import axios from "./axios";
export const login = (dto: { username: string; password: string }) => {
  return axios.post("/login", dto);
};
