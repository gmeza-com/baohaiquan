import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { isOn, isSsr } from "./util";
import { get } from "./cookie";

const APP = process.env.NEXT_PUBLIC_APP;

export const rest = axios.create({
  baseURL: APP + "/api",
  withCredentials: true,
}) as RestInstance;

rest.interceptors.request.use(async (config) => {
  const token = await get("access_token");

  if (config?.headers) {
    if (token && !config.headers?.Authorization)
      config.headers.Authorization = `Bearer ${token}`;

    if (isSsr()) {
      // allow workspace to be set in cookie (server-side only)
      const workspace = await get("workspace");
      if (workspace && !config.headers["Cookie"])
        config.headers["Cookie"] = `workspace=${workspace}`;
    }
  }

  return config;
});

rest.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    if (
      Array(6)
        .fill(0)
        .map((_, i) => i + 200)
        .includes(status)
    ) {
      const payload = isOn(data?.payload) ? data.payload : data;
      const res: any = { status, ...payload };
      return res;
    }

    throw { status, data };
  },
  (error: AxiosError) => Promise.reject(error)
);

interface RestInstance extends AxiosInstance {
  request<T = any>(config: AxiosRequestConfig): Promise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
}
