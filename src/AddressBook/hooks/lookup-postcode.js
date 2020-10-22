import { useState, useEffect } from "react";
import axios from "axios";

const { CancelToken } = axios;

export const useLookupPostCode = postcode => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    if (!postcode || postcode.length < 6 || postcode.length > 10) {
      setLoading(false);
      setResult(null);
      return;
    }

    setLoading(true);
    const source = CancelToken.source();

    const request = async () => {
      try {
        const response = await axios(
          `https://api.postcodes.io/postcodes/${postcode}`,
          {
            cancelToken: source.token
          }
        );

        setResult(response.data);
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        setLoading(false);

        if (err.response && err.response.status === 404) {
          setResult("NOT FOUND");
        } else {
          setResult("ERROR");
        }
      }
    };

    request();

    return () => {
      source.cancel();
    };
  }, [postcode]);

  return {
    isLoading: loading,
    result: result && result.result,
    isNotFound: result === "NOT FOUND",
    hasError: result === "ERROR"
  };
};
