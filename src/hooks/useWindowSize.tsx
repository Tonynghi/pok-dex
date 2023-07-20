import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSize(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setSize(window.innerWidth);
      });
    };
  }, [size]);

  return size;
};

export default useWindowSize;
