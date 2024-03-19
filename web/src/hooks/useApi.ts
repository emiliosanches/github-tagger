import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

interface UseApiFetchOptions {
  axiosOptions?: Omit<AxiosRequestConfig, "baseURL">;
  routeParams?: {
    [x: string]: string;
  };
}

interface UseApiOptions extends UseApiFetchOptions {
  manual?: boolean;
}

export function useApi<T>(
  { manual = false, axiosOptions, routeParams }: UseApiOptions,
  depsArray: unknown[]
) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>();

  async function fetch(options?: UseApiFetchOptions) {
    setData(undefined);
    setError(undefined);
    setIsLoading(true);

    try {
      const newAxiosOptions = { ...axiosOptions, ...options?.axiosOptions };
      const newRouteParams = { ...routeParams, ...options?.routeParams };

      let url = newAxiosOptions.url!;

      console.log(newRouteParams);

      Object.entries(newRouteParams).forEach(([paramName, paramValue]) => {
        url = url.replace(new RegExp(`:${paramName}`, "g"), paramValue);

        console.log({ paramName, paramValue, url });
      });

      const res = await instance({ ...newAxiosOptions, url });
      setData(res.data);
      return res;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!manual) {
      fetch();
    }
  }, depsArray);

  return { data, isLoading, error, dispatch: fetch };
}
