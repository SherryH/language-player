import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export const ClientOnly = ({ children }: { children: ReactNode }) => {
  const isMounted = useClientOnly();

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};

export const useClientOnly = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};
