import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timer if the value changes or component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Rerun effect if value or delay changes

  return debouncedValue;
}
