import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for one-time or on-demand data fetching.
 * @param {Function} fetchFn - Async function to call
 * @param {Array} deps - Dependencies that trigger re-fetch
 * @param {boolean} immediate - Whether to fetch immediately
 */
export function useFetch(fetchFn, deps = [], immediate = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, execute, setData };
}

export default useFetch;
