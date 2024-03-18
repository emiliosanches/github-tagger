import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

interface UseApiOptions extends Omit<AxiosRequestConfig, "baseURL"> {
  manual?: boolean;
}

export function useApi<T>({ manual = false, ...axiosOptions }: UseApiOptions) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>();

  const fetch = useCallback(
    async (options?: Omit<AxiosRequestConfig, "baseURL">) => {
      setData(undefined);
      setError(undefined);
      setIsLoading(true);

      try {
        const res = await instance({ ...axiosOptions, ...options });
        setData(res.data);
        return res;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!manual) {
      fetch();
    }
  }, [manual, fetch, axiosOptions]);

  return { data, isLoading, error, dispatch: fetch };
}
