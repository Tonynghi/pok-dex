import { useEffect, useState } from 'react';

const useDebounce = (value: string | undefined, time: number): string | undefined => {
  const [current, setCurrent] = useState<string>();

  useEffect(() => {
    const timeOutId = setTimeout(() => setCurrent(value), time);
    return () => clearTimeout(timeOutId);
  }, [value, time]);

  return current;
};

export default useDebounce;
