"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { ZupassAuth } from './ZupassAuth';

interface ZupassContextType {
  isVerified: boolean;
  setIsVerified: (value: boolean) => void;
}

const ZupassContext = createContext<ZupassContextType | undefined>(undefined);

export function useZupass() {
  const context = useContext(ZupassContext);
  if (!context) {
    throw new Error('useZupass must be used within a ZupassProvider');
  }
  return context;
}

interface ZupassProviderProps {
  children: ReactNode;
}

export function ZupassProvider({ children }: ZupassProviderProps) {
  const [isVerified, setIsVerified] = useState(false);

  if (!isVerified) {
    return <ZupassAuth onVerified={() => setIsVerified(true)} />;
  }

  return (
    <ZupassContext.Provider value={{ isVerified, setIsVerified }}>
      {children}
    </ZupassContext.Provider>
  );
} 