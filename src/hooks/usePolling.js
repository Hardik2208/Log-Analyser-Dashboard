import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook for polling data at regular intervals.
 * @param {Function} fetchFn - Async function to call
 * @param {number} interval - Polling interval in ms (default: 30000)
 * @param {boolean} enabled - Whether polling is active
 */
export function usePolling(fetchFn, interval = 30000, enabled = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const intervalRef = useRef(null);
  const fetchRef = useRef(fetchFn);

  fetchRef.current = fetchFn;

  const execute = useCallback(async () => {
    try {
      setError(null);
      const result = await fetchRef.current();
      setData(result);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    setLoading(true);
    execute();
  }, [execute]);

  useEffect(() => {
    if (!enabled) return;

    execute();
    intervalRef.current = setInterval(execute, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [execute, interval, enabled]);

  return { data, loading, error, lastUpdated, refresh };
}

export default usePolling;
