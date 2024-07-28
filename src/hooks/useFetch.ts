import { useState } from 'react';

/**
 * Custom hook for handling data fetching with loading and error states.
 * @param {Function} callback - The callback function to perform the fetching.
 * @returns {[Function, boolean, string | null]} - A tuple containing fetchData function, isLoading state, and error state.
 */
export const useFetch = <T>(callback: (...args: any[]) => Promise<T>): [(...args: any[]) => Promise<void>, boolean, string | null] => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Function to fetch data asynchronously.
   * @param  {...any} args - Arguments to pass to the callback function.
   */
  const fetchData = async (...args: any[]): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await callback(...args);
    } catch (err) {
      const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchData, isLoading, error];
};

export default useFetch;
