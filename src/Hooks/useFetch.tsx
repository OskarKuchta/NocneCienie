import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface Fetch {
  data: any;
  loading: boolean;
  error: string | null;
}
interface Options {
  method: string;
  headers: {
    Accept: string;
    Authorization: string;
  };
}
const useFetch = (url: string): Fetch => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token: string =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjI5OThlOWMzLTFlOTgtNDBiYS1iODFlLTcxZTk0NjhkM2FhMiIsImlhdCI6MTY5MTI1MTQ2MCwic3ViIjoiZGV2ZWxvcGVyLzczZGY3Yjk0LThkNzktZWM0YS1iMjE0LWRlN2NiZmE2OTkxNiIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1Ljc5LjIxOC43OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.MfwLGOxHjlO1qy8N1Hh6LeX9bhAqcY0n_cNrY26Nctlg3R3GSIQOzkuwy6ngqGZnhCvEKOnFFnx6TuFOyfWNAw";
  const options: Options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    const fetchData: () => Promise<() => void> = async () => {
      const controller = new AbortController();
      try {
        const response: AxiosResponse = await axios.get(url, {
          ...options,
          signal: controller.signal,
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error as string);
        setLoading(false);
      }
      return () => {
        controller.abort();
      };
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export const ErrorBoundary: React.FC<any> = ({ children }) => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnError = (error: any) => {
    setHasError(true);
    setError(error);
  };

  if (hasError) {
    return <div className="error">Something went wrong: {error?.toString()}</div>;
  }

  return <div onError={handleOnError}>{children}</div>;
};

export default useFetch;
