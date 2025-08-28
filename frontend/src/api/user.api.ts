import type { AxiosResponse } from "axios";
import type { LoginProps, LoginResponse, RegisterProps } from "../types/auth";
import { API_URL } from "../utils/url.utils";
import axios from "axios";

export const registerUser = async(formData: RegisterProps) : Promise<AxiosResponse> => {
   const response = await axios.post(`${API_URL}/auth/register`, formData);
   return response.data;
}

export const loginUser = async(formData: LoginProps): Promise<LoginResponse> => {
   const response = await axios.post(`${API_URL}/auth/login`, formData);
   return response.data;
}