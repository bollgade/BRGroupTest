import { useState } from 'react';

type useFetchingType = <dataType>(callback: (...args: any) => any) =>
  [((...args: any) => Promise<void>), boolean, string, dataType | undefined]

export const useFetching: useFetchingType = <dataType>(callback: (...args: any) => any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<dataType>();

  const fetching: (...args: any) => Promise<void> = async (...args: any) => {
    try {
      setIsLoading(true);
      const response = await callback(...args);
      setData(response);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error, data];
};
