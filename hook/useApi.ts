// @ts-nocheck
import { useState, useCallback, useRef } from 'react';

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

interface ApiHook {
  get: (url: string) => Promise<any>;
  post: (url: string, body: any) => Promise<any>;
  put: (url: string, body: any) => Promise<any>;
  del: (url: string) => Promise<any>;
  patch: (url: string, body: any) => Promise<any>;
  refetch: () => Promise<any>;
  loading: boolean;
  error: string | null;
}

const useAPI = (baseUrl: string): ApiHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Store the last request details
  const lastRequestRef = useRef<{
    url: string;
    method: string;
    body: any;
    headers: Record<string, string>;
  } | null>(null);

  const request = useCallback(
    async (url: string, method: string = 'GET', body: any = null, headers: Record<string, string> = {}): Promise<any> => {
      setLoading(true);
      setError(null);

      // Update last request details
      lastRequestRef.current = { url, method, body, headers };

      try {
        const options: RequestOptions = {
          method,
          headers: {
            ...headers,
          },
        };

        // Skip setting Content-Type for FormData
        if (body instanceof FormData) {
          options.body = body;
        } else if (body) {
          options.body = JSON.stringify(body);
          options.headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLoading(false);
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(errorMessage);
        setLoading(false);
        throw err;
      }
    },
    [baseUrl]
  );

  const get = useCallback((url: string) => request(url), [request]);
  const post = useCallback((url: string, body: any) => request(url, 'POST', body), [request]);
  const put = useCallback((url: string, body: any) => request(url, 'PUT', body), [request]);
  const del = useCallback((url: string) => request(url, 'DELETE'), [request]);
  const patch = useCallback((url: string, body: any) => request(url, 'PATCH', body), [request]);

  // Refetch method
  const refetch = useCallback(async () => {
    if (!lastRequestRef.current) {
      throw new Error('No request to refetch.');
    }

    const { url, method, body, headers } = lastRequestRef.current;
    return request(url, method, body, headers);
  }, [request]);

  return { get, post, put, del, patch, refetch, loading, error };
};

export default useAPI;
