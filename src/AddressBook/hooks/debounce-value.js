import { useState, useEffect } from "react";

/**
 * Debounces the input value
 *
 * The return value is only updated when the input hasn't changed
 * for {timeout}ms.
 */
export const useDebounce = (value, timeout) => {
  const [returnValue, setReturnValue] = useState(null);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setReturnValue(value);
    }, timeout);

    return () => clearTimeout(timerId);
  }, [value]);

  return returnValue;
};
